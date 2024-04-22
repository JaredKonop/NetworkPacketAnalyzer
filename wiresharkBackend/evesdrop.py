import os
from scapy.all import *
import datetime
import sys
def main(time,interface):
    date = datetime.datetime.now()
    current_time = date.strftime("%H%M%S")
    dateString = str(date.strftime("%B"))  + str(date.year)+"-" + str(date.day) +"-" + str(current_time)
    fileCap = "./assets/cap/Captures" + dateString+ ".pcap"
    fileTxt = "./assets/txt/Captures" + dateString+ ".txt"
    cliCommand ="tshark -i "+interface +" -T fields -e frame.time -e ip.src -e ip.dst -e ip.proto -e udp.dstport -e dns.qry.name -e dns.a -a duration:"+time+ " -w"+ fileCap+ "> "+fileTxt+ " -F pcap"
    # return cliCommand
    print(fileTxt)
    print(cliCommand)
    # os.system(cliCommand)

main(sys.argv[1],sys.argv[2])
