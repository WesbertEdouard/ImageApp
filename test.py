d = dict()
f = open("data.csv")
for line in f.iteritems():
    line = line.strip('\n')
    (key, val) = line.split(",")
    d[key] = val
print(d)