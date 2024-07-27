#!/bin/bash


PRI_KEY="-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAODjwa+WyP2UtEpz
mNjN9hx1ac54tFoAVC1VHb/5uX8Q21opAfiqTm5CiTgBb6ywcVz/3ocg+hfzeiv0
020TOXE7vOBYXqaoiRg4lFURAqu7sIOKn8oRrE3jScdtSRNurW5g+iE4TbQ9PxFV
0OLXz61S0tFAx1YrpkIc5y09wGVjAgMBAAECgYA+7v2wyZ2NeSPLAfZwFZMd+62U
Xir6VMU5umwM4TGL4YfA/2DR2bcBHBWSWrSJuwa+Y8w+PHhAY5541pakG5EjHKTi
qIu12QOfOMnHr3TvGYc1yxq9tjJS3j7f4UwZnRniaa7GwyCx7TjXHn6Xzbv0vQQC
YQq/Gc/0pvOVIeXk4QJBAPVdTWGuIqcmq4XlsoEoa8HroSvFb5a2kXsiHn1w+cO2
/TxGrnYakTlSCcltDhpY7P24chi8htEQVM59o5fB8PcCQQDqo0FCFqitqx4T4CdD
PUOgWKGSC6TIWH3rnsfPkn17kP94jCJ/io741QQYkNtvhcrChxbkaUeOoubmjqqR
6D/1AkEA34mYZSSbh4MwgzVoMklcGvkMBe/DISDFW9QSyR/zPL5q6c5PRWQg6IL4
TZ1gWtqnVuQCdszTWoaxbMqED09uswJAB6h6acjJipmKKsXnIieuvF4IL/cXUr6o
pXcSOHEkjVLnM60HNzhzgCWbs52Ou+4W9xBnq97PyhUBCkdfw9FbvQJBAPQ2ygIl
04BSvQlYfQUcO8hBxgF1CdmQJlLaMd1X//dQ4oTOUWE/UirX+olubsVxpKw+CS6T
Th6Ui/SgNQuD2hg=
-----END PRIVATE KEY-----"


# 获取 issue body（假设 gh CLI 已经安装并配置好）
ISSUE_BODY="### CodeTea - Da Hong Pao tea
- Standard: B
- Quantity: 500g
- Price: ￥600
### Total
- Subtotal: ￥600
- Freight: ￥5
- Total: ￥605
### Information(Encrypted)
\`\`\`
cj18GMedKT8oemhA6Fj+Vhv2YhR0OKueo0y3S1OYxB+1PbaVAbjZGWtYrFs49f4nEjk5LgbpPyyTlXAXAnz2uoVu1+s7wSdRH6lVfZg+Xhlb3j5T00L+lkbFGRr2zPbgF2o+B2lZTYeN1oZSJ+I/9rJ46nhsbgZgn9AVwPk2YOA=
MjyCo33doX8yKq5iwKtSm2IdU81H1u7JLpfR2E21MCTx3XevsxwYwJYl8VuARqSgFLqh/Wc5VN2Zr1aTNPes13gz56IwN1mqdItNNXjm7QQfBahC7/LeWO8zbzmNOyMxrO2AB2PqXKxuuDenMPiHJr59yTcJCyK8HxYpev+UnhE=
\`\`\`
md5=02bda52f60a89228925daad754016ce8"

# 提取 Information(Encrypted) 内容
INFO_ENCRYPTED=$(echo "$ISSUE_BODY" | sed -n '/^```$/, /^```$/p' | sed '1d;$d')
echo "$INFO_ENCRYPTED"

exit 0
# 按 \n 分组
echo "Splitting lines"
IFS=$'\n' read -rd '' -a lines <<<"$INFO_ENCRYPTED"
for line in "${lines[@]}"; do
  echo "Line: $line"
done

# 解密信息
echo "Creating private key file"
echo "$PRI_KEY" > private_key.pem

echo "Decrypting each line"
for line in "${lines[@]}"; do
  decrypted_line=$(echo "$line" | base64 -d | openssl pkeyutl -decrypt -inkey private_key.pem -pkeyopt rsa_padding_mode:pkcs1)
  echo "$decrypted_line"
done

echo "Cleaning up"
rm private_key.pem
