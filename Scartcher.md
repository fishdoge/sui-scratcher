### get test usdt

sui client call --package 0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96 --module usdt --function faucet --args 0xf0a1515e4ab64b7fa3252d659e0b21c8152c451e4a61309690859c59fcba8fb3

### 取得 collect_book 物件

sui client call --package 0x80db05324dd2c3752746a8e012f9901bfe8815b5234a3e49faeb29616b8d63bb --module suirandom --function start_new_collect_book --type-args 0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT --args 0x7cab13913e4106f03512f1059864abb183207c1806dcd0e9caefd7a6f5f35a6e

### 使用 sui client objects 確認 collect_book object address

### Simple

sui client call \
--dry-run \
--package 0x80db05324dd2c3752746a8e012f9901bfe8815b5234a3e49faeb29616b8d63bb \
--module suirandom \
--function packup \
--type-args 0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT \代幣 Address
--args \
0x8c05518f641599c67787c33c1fc25fdd1ce1b5a23054a6ea9a0d63024a3f3af5 \ 新產生的 Collect_Book 物件
0x87a1f4e36c944ef018548f393cc2691b4025bc71e86aed7561ec3a60e8bfbfc5 \ 自己的 USDT 物件
0x757fe0f98d867f98cede94209f9a4b5853c21d51c995f5cd705289bc34b8404e \
0x8 \
--gas-budget \
60000000

### Transaction Digest EmBYDE5An1XMXVbqxCo4WaCLAfpbCC7DdUGtLHaK7BaH

Package: 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a
UpgradeCap: 0x79d3eba0e34d9e754f9e303db14e9899c8c84993741b26dde14e051711db22b1
AdminCap: 0x47da46b74d61bafc36fe17f91b9adfab293bee6906a6b648312ba31b57a3cfc2
Whitelist: 0x7b7ad7dd9cd4e8c538d04ce066897170b9bd68ba29d85d524f2457d89cceaf87

### Transaction Digest CcxN6nEU8o7SJaJW3oDmD1Hgpwrz81sUcYYp7YNgmcB8

CoinMeta<usdt>: 0x7e171ffa5e860a5e403cb6dbac1edd63f7c2994ebdd3c9bbc8b31f527fee5468

sui client call \
--package 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a \
--module suirandom \
--function add_whitelist_coin \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x47da46b74d61bafc36fe17f91b9adfab293bee6906a6b648312ba31b57a3cfc2 \
0x7b7ad7dd9cd4e8c538d04ce066897170b9bd68ba29d85d524f2457d89cceaf87 \
0x7e171ffa5e860a5e403cb6dbac1edd63f7c2994ebdd3c9bbc8b31f527fee5468

### Transaction Digest 9Xo8R8XFf6fdDHVsSMU7P7z51S2xgTpgygt2Tg31z1kq

sui client call \
--package 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a \
--module suirandom \
--function create_shop \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x47da46b74d61bafc36fe17f91b9adfab293bee6906a6b648312ba31b57a3cfc2 \
0x7b7ad7dd9cd4e8c538d04ce066897170b9bd68ba29d85d524f2457d89cceaf87

Game: 0x6c95c45406f8207d4437ab3d15e1801fc239ce7b64457680f30b348d03618404

### Transaction Digest HoiBB4eGTeziuwMRTnZ2Ut4nejATPdLBQsjs8mvCeTGk

Coin<usdt,1000>: 0xb4b71d8daa387286071d4a60f7b192671a1f8100a74836f4c397ec8ee61e5429

sui client call \
--package 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a \
--module suirandom \
--function deposit_reward_pool \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x47da46b74d61bafc36fe17f91b9adfab293bee6906a6b648312ba31b57a3cfc2 \
0x6c95c45406f8207d4437ab3d15e1801fc239ce7b64457680f30b348d03618404 \
0xb4b71d8daa387286071d4a60f7b192671a1f8100a74836f4c397ec8ee61e5429

### Transaction Digest 8y5BJN6EQpWk44Qvth7mADu7e6hyoEN92AfTybqH9GnP

sui client call \
--package 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a \
--module suirandom \
--function start_new_collect_book \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x6c95c45406f8207d4437ab3d15e1801fc239ce7b64457680f30b348d03618404

Collect Book: 0xc9893c6fef5e12fdd2d8f0909ee5ec99f8572fbff4f21f2ac91cc7ce97e1b2c0

### Transaction Digest

sui client call \
--package 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a \
--module suirandom \
--function packup \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0xc9893c6fef5e12fdd2d8f0909ee5ec99f8572fbff4f21f2ac91cc7ce97e1b2c0 \
0x7b0d8090a8a39c885c3216f61c05b762fbcc97ce63f81ee913bcca8a80fd3238 \
0x6c95c45406f8207d4437ab3d15e1801fc239ce7b64457680f30b348d03618404 \
0x8

### Transaction Digest CKNqoM2gQF1qL6YNfTWZ9RmiEP5vNnxoKBKvk7qRcsD3

sui client call \
--package 0xd8cc41b8b844a4dc88015918d1bfd3b5ec202c7f86052580d3cd509bfab9292a \
--module suirandom \
--function withdraw_reward_pool \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x47da46b74d61bafc36fe17f91b9adfab293bee6906a6b648312ba31b57a3cfc2 \
0x6c95c45406f8207d4437ab3d15e1801fc239ce7b64457680f30b348d03618404

sui client call \
--package 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4 \
--module suirandom \
--function read_whitelist_coin \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x7b7ad7dd9cd4e8c538d04ce066897170b9bd68ba29d85d524f2457d89cceaf87
