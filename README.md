# medLar_Lei19

### Relatório
https://www.overleaf.com/9367518492qrrdrrhdpndj

## Planeamento da Medicação Semanal de Utentes num Lar
- Processo de login para auxiliares – Número de identificação interno (identificador único) + password;
- Criar uma ficha da medicação atual para cada utente – inclui a medicação habitual e a medicação temporária:
  *  Nome do Paciente;
  * Número de Processo do Paciente (identificador único);
  *  Data de início e data de fim de cada medicamento;
  *  Nome do medicamento – encontrar repositório de medicamentos;
  *  Especificar para cada período do dia (pequeno-almoço, almoço, lanche, jantar e ceia) a quantidade a ser administrada, bem como a unidade (comprimidos, gramas, mililitros, gotas), para cada dia da semana (segunda-feira a domingo);
  *  Observações.
- Edição da ficha da medicação atual de cada utente – adicionar, editar ou remover medicamentos;
- Auxiliar na preparação da caixa de medicamentos semanal de cada utente – ter uma lista de tarefas a realizar e confirmar a realização de cada tarefa (todas as semanas o processo deve ser repetido; deve ser possível gerir alterações na caixa de medicamentos semanal durante a semana, como por exemplo, caso um novo medicamento for adicionado nesse período);
- Área de lembretes para indicar a falta de stock de determinados medicamentos – permitir depois confirmar a realização da tarefa.

## Ferramentas:
- Figma – the collaborative interface design tool;
- Visual Studio Code;
- Android Studio – emulador e para fazer a sincronização dos ficheiros (versões);
- MySQL Workbench.

## Tecnologias:
- Frontend:React Native – NativeBase (ui components); react-native-navigation (navegação); Formik/Yup (criar formulários e a sua validação); Redux (gerir o estado da app);
- REST API:Node.js – Express (Node.js web application framework); body-parser (to handle HTTP POST request in Express.js version 4 and above/extract the entire body portion of an incoming request stream and exposes it on req.body); Sequelize (Node.js ORM (Object-relational mapping)); bcrypt (cifrarpasswords); jsonwebtoken (implementar JSON Web Tokens); nodemon (automatically restart server after changes);
- Database:MySQL

## Rotas API (http://localhost:8000)
| Rota           | Sub-Rota        | Utilizador | Descrição                          |
|----------------|-----------------|------------|------------------------------------|
|                | /login          | Todos      | Inicio de Sessão                   |
|                | /logout         | Todos      | Terminar Sessão                    |
| api/auxiliares | /               | Admin      | Lista de Auxiliares                |
| api/auxiliares | /ativos         | Admin      | Lista de Auxiliares ativos         |
| api/auxiliares | /inativos       | Admin      | Lista de Auxiliares inativos       |
| api/auxiliares | /admins         | Admin      | Lista de Administradores           |
| api/auxiliares | /criar          | Admin      | Criação de Auxiliar                |
| api/auxiliares | /:uid           | Admin      | Consulta Auxiliar por id           |
| api/auxiliares | /desativar/:uid | Admin      | Desativa Auxiliar por id           |
| api/auxiliares | /ativar/:uid    | Admin      | Ativa Auxiliar por id              |
| api/auxiliares | /desativar/:uid | Admin      | Trasforma Auxiliar por id em Admin |





