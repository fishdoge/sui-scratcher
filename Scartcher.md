

### get test usdt
sui client call --package 0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96 --module usdt --function faucet --args 0xf0a1515e4ab64b7fa3252d659e0b21c8152c451e4a61309690859c59fcba8fb3


### 取得 collect_book 物件
sui client call --package 0xf47f765b2ceca6a00f327e4465181d25d525a7cfdcbebacacf59902154fe75b6 --module suirandom --function start_new_collect_book --type-args 0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT --args 0x7cab13913e4106f03512f1059864abb183207c1806dcd0e9caefd7a6f5f35a6e

### 使用sui client objects 確認 collect_book object address

### Simple
sui client call \
--dry-run \
--package 0xddd5441e2beeb6e8c2af7875cf15619ed32243468a4e69d8e4144a88b0b405b5 \
--module suirandom \
--function packup \
--type-args 0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT \代幣Address
--args \
0x8c05518f641599c67787c33c1fc25fdd1ce1b5a23054a6ea9a0d63024a3f3af5 \ 新產生的Collect_Book 物件
0x87a1f4e36c944ef018548f393cc2691b4025bc71e86aed7561ec3a60e8bfbfc5 \ 自己的USDT物件
0x757fe0f98d867f98cede94209f9a4b5853c21d51c995f5cd705289bc34b8404e \
0x8 \
--gas-budget \
60000000


