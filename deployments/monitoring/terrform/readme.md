## get into directory

``` bash
cd deployments/monitoring/terraform
```

## plan 

``` bash
terraform plan 
```

## apply

``` bash
terraform apply
```

## destroy

``` bash
terraform destroy
```

## get private key

``` bash
terraform output -raw private_key_pem > private_key.pem
```

## set key permissions

``` bash
chmod 400 private_key.pem
```

## get droplet ip

``` bash
terraform output instance_ip
```

## ssh into droplet

``` bash
ssh -i private_key.pem root@$(terraform output instance_ip)
```