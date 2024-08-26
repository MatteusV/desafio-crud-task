## CRUD TASK
Nesse desafio desenvolvi uma API para realizar o CRUD de *tasks* (tarefas).\
- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa

# Para rodar o projeto
cria um arquivo `.env` e adiciona:
- API_BASE_URL
- WEB_BASE_URL
- PORT
- JWT_SECRET
- DATABASE_URL (SQLITE)\
`npm install`\
`npx prisma migrate dev`\
`npm run start:dev`



### Regras de negócio
- `Cadastro de Usuário`. O usuário deve ser capaz de se cadastrar com e-mail e senha. Implementar validação básica para e-mail e senha.\
- `Autenticação`. Implementar login e logout de usuários utilizando JWT (JSON Web Token). Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.\
- `Gerenciamento de Tarefas`. Listar todas as tarefas do usuário autenticado. Adicionar novas tarefas com um título e uma descrição. Marcar tarefas como concluídas. Editar o título e a descrição de uma tarefa. Excluir uma tarefa.\

### Rotas

## /users 
`Cadastro de usuário`: `POST`-`/users`\
`Pegar usuário pelo id`: `GET`-`/users/:id`

## /auth
`Autenticação`: `POST`-`/auth`\
`pegar o perfil`: `GET`-`auth/profile`

## /tasks
`Criar tarefa`: `POST`-`/tasks`\
`Atualizar tarefa`: `PATCH`-`/tasks/:id`\
`Pegar tarefa pelo id`: `GET`-`/tasks/:id`\
`Deletar tarefa`: `DELETE`-`/tasks/:id`