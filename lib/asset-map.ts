export const assetMap: Record<string,{file:string;kind?:string}> = {
 "Splunk":{file:"splunk.svg",kind:"mono"},"Suricata":{file:"suricata.png"},"Zeek":{file:"zeek.png",kind:"mono"},"Wireshark":{file:"wireshark.svg",kind:"mono"},"Python":{file:"python.svg"},"Docker":{file:"docker.svg"},"Kubernetes":{file:"kubernetes.svg"},"NGINX":{file:"nginx.svg"},"Linux":{file:"linux.svg"},"Git":{file:"git.svg"},"GitHub":{file:"github.svg",kind:"mono"},"AWS":{file:"aws.svg"},"Azure":{file:"azure.svg"},"GCP":{file:"gcp.svg"},"Trivy":{file:"trivy.svg"},"SonarQube":{file:"sonarqube.svg"},"Burp Suite":{file:"burpsuite.png",kind:"burp"},"Nmap":{file:"nmap.png"}
};
Object.assign(assetMap, {
  "Metasploit": {
    "file": "metasploit.svg"
  },
  "Hydra": {
    "file": "hydra.ico"
  },
  "SQLMap": {
    "file": "sqlmap.png"
  },
  "Searchsploit": {
    "file": "exploitdb.png"
  },
  "Nessus": {
    "file": "nessus.svg",
    "kind": "light"
  },
  "Qualys": {
    "file": "qualys.svg"
  },
  "BeEF": {
    "file": "beef.png",
    "kind": "light"
  },
  "Nikto": {
    "file": "nikto-publisher.png",
    "kind": "light"
  },
  "John the Ripper": {
    "file": "openwall.png",
    "kind": "light"
  },
  "Hashcat": {
    "file": "hashcat.png"
  },
  "OWASP ZAP": {
    "file": "zap.svg"
  },
  "BloodHound": {
    "file": "bloodhound.png",
    "kind": "light"
  },
  "Autopsy": {
    "file": "autopsy.svg"
  },
  "EnCase": {
    "file": "opentext.svg"
  },
  "Kali Linux": {
    "file": "kali.svg"
  },
  "PowerShell": {
    "file": "powershell.svg"
  }
});
