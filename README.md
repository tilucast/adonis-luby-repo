Olá.
Pasta codechallenges => algoritmos
pasta web => react , feito anteriormente. Repositório original: https://github.com/tilucast/luby-repo, live version: https://shitty-github-clone.vercel.app/
pasta node => node com adonis

### Node

Usei Insomnia pra fazer as requisições. Arquivo json do insomnia com as rotas foi upado, na pasta node.

Algumas observações:
Algumas rotas não fazem sentido de acordo com o que se é feito comumente em apis. Dado mais tempo poderia polir o projeto.
Não consegui usar Lucid pra fazer a relação many to many entre user/follower. A relação existe, existem queries que retornam o que se espera,
porém, usando Lucid, não é possível. Devo ter cometido algum erro na hora de nomear as tabelas, ou as chaves. Não tenho certeza. Fora isso, todas as
outras relações estão corretas.

Acredito que devam existir erros no projeto. Erros esses que não consegui identificar devido ao tempo limitado.

No banco não existe uma tabela de "following". Apenas User e Follower, e uma tabela pivot pra fazer as queries.
Todos os cruds que fazem sentido existir, foram codados. Vou listar abaixo as rotas, e o retorno das mesmas.

Todos os endpoints de update ou create estão sendo validados.

---

#### Crud de users

GET /users => todos os usuários cadastrados.
GET /users/users.username => retorna informações condizentes com a página de usuário disponibilizado no protótipo/ buscar usuário no banco pelo username.
PUT /users/users.id => atualizar informações do usuário.
POST /users => cadastrar um usuário.
DELETE /users/users.id => deletar um usuário.

### Crud de repos

GET /repositories, QUERY userId = users.id => retorna informações condizentes com a página de repositórios do usuário.
GET /repositories/repositories.name => retorna informações de um repo específico pelo nome.
PUT /repositories/repositories.id => atualizar informações do repositório.
POST /repositories, QUERY userId = users.id => cadastrar um repositório.
DELETE /repositories/repositories.id => deletar um repositório.

### Login

POST /login , BODY username = users.username => verifica se o username existe no banco, se sim, cadastra um novo registro na tabela tokens.

### To follow

Como explicado acima, a parte de follower/following está bagunçada. Dado mais tempo poderia tentar arrumar.
HEADERS estão sendo usados como uma """autenticação""". Todas as informações do usuário logado que serão necessárias nas queries estão sendo obtidas por HEADERS.

Ao cadastrar um novo usuário, também é cadastrado um follower. O id de follower é o mesmo id de usuário. Não existe updates ou deletes em follower, visto
que não faria o menor sentido.
Em following, existem read e delete, visto que updates não fariam sentido.

GET /following, QUERY id = follower_user.follower_id => retorna todos os usuários que um usuário específico está seguindo.
GET /followers, QUERY username = users.username => retorna todos os usuários que seguem um usuário específico.

POST /followers, QUERY followeeId = follower_user.follower_id ou user_id (id do usuário a ser seguido), HEADERS = {username: users.username, userId: users.id} => seguir um usuario.

DELETE /following/id (id do usuário a deixar de ser seguido), HEADERS = {username: users.username, userId: users.id} => deixa de seguir um usuário
(usuário esse que é referenciado pelo id de params da rota.)

### Repo stars

POST /repositories/stars , QUERY repository_id = repositories.id, HEADERS = {username: users.username, id: users.id} => Dá star em um repositório.

DELETE /repositories/stars/id (repositories.id), HEADERS = {username: users.username, userid: users.id} => Tira a star de um repositório.
