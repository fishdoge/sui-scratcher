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

### Transaction Digest EWQ6cUerf6jc8Mz38m8kF1DBNEgiQihtan5zv3fWCwha

Package: 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4
UpgradeCap: 0x54766348eb60b150d47edf465bca1d545df9073bd3d3f490dc0ed9d6ab1e2ae2
AdminCap: 0x41211058ae3cbca1ee55aea63fd47890c7ee034bd6ace006ae5cae7883910fa2
Whitelist: 0x4c7370ef7bb35f74875fb76bf4f275871bc41c352aac40d1ae3869fc66c8531f

### Transaction Digest EUz4rswwTD4wANEj6SvHzKC859CU1y8TkKN4j5iRCjrN

CoinMeta<usdt>: 0x7e171ffa5e860a5e403cb6dbac1edd63f7c2994ebdd3c9bbc8b31f527fee5468

sui client call \
--package 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4 \
--module suirandom \
--function add_whitelist_coin \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x41211058ae3cbca1ee55aea63fd47890c7ee034bd6ace006ae5cae7883910fa2 \
0x4c7370ef7bb35f74875fb76bf4f275871bc41c352aac40d1ae3869fc66c8531f \
0x7e171ffa5e860a5e403cb6dbac1edd63f7c2994ebdd3c9bbc8b31f527fee5468

### Transaction Digest Aw9EmuRFpVjMcqoa6GYLFHJyBNTSQQCSm91rpYyd1BSm

sui client call \
--package 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4 \
--module suirandom \
--function create_shop \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x41211058ae3cbca1ee55aea63fd47890c7ee034bd6ace006ae5cae7883910fa2 \
0x4c7370ef7bb35f74875fb76bf4f275871bc41c352aac40d1ae3869fc66c8531f

Game: 0x786af8cbb28d7ef5f85cbaa8d3d00c83ccc0c390d56ff6cb5fbcd8122bd29e77

### Transaction Digest ALfL6RZwTXYzNTRLYe5wF6kUVd9d4zjHmp9WxqxhKWyB

Coin<usdt,1000>: 0x8253c6afa69b65da1298419ee661dedff1310ce0b011eb9e9aa7c150c40fa069

sui client call \
--package 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4 \
--module suirandom \
--function deposit_reward_pool \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x41211058ae3cbca1ee55aea63fd47890c7ee034bd6ace006ae5cae7883910fa2 \
0x8253c6afa69b65da1298419ee661dedff1310ce0b011eb9e9aa7c150c40fa069 \
0x786af8cbb28d7ef5f85cbaa8d3d00c83ccc0c390d56ff6cb5fbcd8122bd29e77

### Transaction Digest ATvhWrw2NgE58GwvHkTMNj3NdmorR9rQHqbcnDhHYkJ8

sui client call \
--package 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4 \
--module suirandom \
--function start_new_collect_book \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0x786af8cbb28d7ef5f85cbaa8d3d00c83ccc0c390d56ff6cb5fbcd8122bd29e77

Collect Book: 0xcba7175eca26106fa53d219b4fdbb7cfe5f32f9b58cae45c403a22bb866bca93

### Transaction Digest

sui client call \
--package 0x8c09f463918da1093006e5e944f8665338db837634095abe7592391a96b60fe4 \
--module suirandom \
--function packup \
--type-args "0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT" \
--args \
0xcba7175eca26106fa53d219b4fdbb7cfe5f32f9b58cae45c403a22bb866bca93 \
0x7b0d8090a8a39c885c3216f61c05b762fbcc97ce63f81ee913bcca8a80fd3238 \
0x786af8cbb28d7ef5f85cbaa8d3d00c83ccc0c390d56ff6cb5fbcd8122bd29e77 \
0x8
