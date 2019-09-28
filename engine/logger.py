from datetime import datetime
import os

def getTimeString():
	time = datetime.now()

	res = str(time.year).zfill(2) + '-'
	res += str(time.month).zfill(2) + '-'
	res += str(time.day).zfill(2) + '-'
	res += str(time.hour).zfill(2) + '-'
	res += str(time.minute).zfill(2) + '-'
	res += str(time.second).zfill(2)

	return res

# Create log files used for detection
# Bitcoin nodes run on 8333 by default

def startLog(port):
	if not os.path.isdir('./data/'):
		os.system('mkdir data')

	while True:
		filename = getTimeString() + '.pcap'
		os.system('tcpdump -q -c 100000 port ' + port + ' -w ./data/' + filename)
