import os
from os import listdir
from os.path import isfile, join
from collections import deque

def printnamesBFS(start_dir):
    search_queue = deque()
    search_queue.append(start_dir)
    count = 0
    while search_queue:
        dir = search_queue.popleft()
        for file in sorted(listdir(dir)):
            full_path = join(dir, file)
            if isfile(full_path):
                count += 1
                print(file, ' ', count)
            else:
                search_queue.append(full_path)
                

printnamesBFS('react-ui-exercises/src')
print('\n ------')

def printnamesDFSRecursive(start_dir):
    count = 0
    for file in sorted(listdir(start_dir)):
        full_path = join(start_dir, file)
        if isfile(full_path):
            count += 1
            print(file, ' ', count)
        else:
            printnamesDFSRecursive(full_path)

printnamesDFSRecursive('react-ui-exercises/src')
    


# List the current directory using os.listdir
