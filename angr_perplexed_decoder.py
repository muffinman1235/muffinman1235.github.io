import angr
import claripy

binary_path = 'perplexe'
project = angr.Project(binary_path, auto_load_libs=False)

password_length = 27  # exact length from check function

password_chars = [claripy.BVS(f'byte_{i}', 8) for i in range(password_length)]
password_symbolic = claripy.Concat(*password_chars)

state = project.factory.full_init_state(args=[binary_path],
                                        stdin=password_symbolic)

# Set broader range (allow full byte range except null bytes '\x00' and '\n')
for byte in password_chars:
    state.solver.add(byte != 0)       # no null bytes
    state.solver.add(byte != ord('\n'))  # no newline (fgets termination)

simgr = project.factory.simulation_manager(state)

simgr.explore(find=lambda s: b'Correct!! :D' in s.posix.dumps(1),
              avoid=lambda s: b'Wrong :(' in s.posix.dumps(1),timeout=5000)

if simgr.found:
    found_state = simgr.found[0]
    password_solution = found_state.solver.eval(password_symbolic, cast_to=bytes)
    print("Password found:", password_solution)
else:
    print("No solution found.")
