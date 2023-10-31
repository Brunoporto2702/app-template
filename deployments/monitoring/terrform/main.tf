terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
    }
  }
}


provider "digitalocean" {
  token = "your token"
}

resource "digitalocean_ssh_key" "monitoring_key" {
  name       = "monitoring_key"
  public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "digitalocean_droplet" "monitoring_vm" {
  image              = "ubuntu-20-04-x64"
  name               = "monitoring"
  region             = "nyc3"
  size               = "s-1vcpu-1gb" # Minimal size
  ssh_keys           = [digitalocean_ssh_key.monitoring_key.fingerprint]
}

# resource "digitalocean_firewall" "web" {
#   name = "only-22-80-and-443"

#   droplet_ids = [digitalocean_droplet.monitoring_vm.id]

#   inbound_rule {
#     protocol         = "tcp"
#     port_range       = "22"
#     source_addresses = ["190.111.189.245", "2002:1:2::/48"]
#   }

#   inbound_rule {
#     protocol         = "tcp"
#     port_range       = "80"
#     source_addresses = ["0.0.0.0/0", "::/0"]
#   }

#   inbound_rule {
#     protocol         = "tcp"
#     port_range       = "9090"
#     source_addresses = ["0.0.0.0/0"]
#   }

#   inbound_rule {
#     protocol         = "tcp"
#     port_range       = "443"
#     source_addresses = ["0.0.0.0/0", "::/0"]
#   }

#   inbound_rule {
#     protocol         = "icmp"
#     source_addresses = ["0.0.0.0/0", "::/0"]
#   }

#   // permit all outbound traffic
#   outbound_rule {
#     protocol              = "tcp"
#     port_range            = "1-65535"
#     destination_addresses = ["0.0.0.0/0", "::/0"]
#   }

#   outbound_rule {
#     protocol           = "udp"
#     port_range         = "1-65535"
#     destination_addresses = ["0.0.0.0/0", "::/0"]
#   }

#   outbound_rule {
#     protocol           = "icmp"
#     destination_addresses = ["0.0.0.0/0", "::/0"]
#   }
# }

resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
}

output "instance_ip" {
  value = digitalocean_droplet.monitoring_vm.ipv4_address
}

output "private_key_pem" {
  value     = tls_private_key.ssh_key.private_key_pem
  sensitive = true
}





