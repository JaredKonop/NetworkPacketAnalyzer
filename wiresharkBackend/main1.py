import pyshark
import datetime
import sys
date = datetime.datetime.now()
current_time = date.strftime("%H%M%S")
dateString = str(date.strftime("%B"))  + str(date.year)+"-" + str(date.day) +"-" + str(current_time)
file = "./assets/cap/Captures" + dateString+ ".cap"
# print(file)
output = open(file, "w")
capture = pyshark.LiveCapture(output_file=file)
# # capture.interfaces = ['eth0', 'eth1']
# for packet in capture.sniff_continuously(packet_count=5):
#     print ('Just arrived: ', packet)
capture.sniff(timeout=int(sys.argv[1]))
output.close()
print(capture)