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

## Configurações da Base de Dados
### Medicamento
Correr o ficheiro [medicamentos.sql](Extra_Files/medicamentos.sql)
### Horarios
Correr o ficheiro [horario.sql](Extra_Files/horario.sql)
### User Admin
Executar o comando:
```mysql
INSERT INTO `medlar`.`auxiliar` (`id`, `password`, `contacto`, `nome`, `apelido`, `data_nascimento`, `rua`, `localidade`, `codigo_postal`, `cidade`, `estado`) VALUES ('1', '$2b$10$dWVz3HQ6zGIJaX6zq.NzUu8HyjoSY6CuXA1dD/HU/gHNE6uNT2DEy', '911111111', 'Auxiliar', 'primeiro', '1965-05-05', 'Qualquer', 'Qualquer', '4800', 'Qualquer', '2');
```
Utilizar o Postman e fazer 
- POST http://localhost:8000/login
    - body - x-www-form-urlencoded
        - id    -   1
        - pass  -   pass

## Rotas par o servidor (http://localhost:8000)
| Metodo | Rota              | Sub-Rota           | Utilizador | Descrição                          |  Test  |
|--------|-------------------|--------------------|------------|------------------------------------|--------|
| POST   |                   | /login             | Todos      | Inicio de Sessão                   | :heavy_check_mark: |
| GET    |                   | /logout            | Todos      | Terminar Sessão                    | :heavy_check_mark: |
| GET    | /api/auxiliares   | /                  | Admin      | Lista de Auxiliares                | :heavy_check_mark: |
| POST   | /api/auxiliares   | /                  | Admin      | Criação de Auxiliar                | :heavy_check_mark: |
| GET    | /api/auxiliares   | /:uid              | Admin      | Consulta Auxiliar por id           | :heavy_check_mark: |
| GET    | /api/auxiliares   | /ativos            | Admin      | Lista de Auxiliares ativos         | :heavy_check_mark: |
| GET    | /api/auxiliares   | /inativos          | Admin      | Lista de Auxiliares inativos       | :heavy_check_mark: |
| GET    | /api/auxiliares   | /admins            | Admin      | Lista de Administradores           | :heavy_check_mark: |
| GET    | /api/auxiliares   | /desativar/:uid    | Admin      | Desativa Auxiliar por id           | :heavy_check_mark: |
| GET    | /api/auxiliares   | /ativar/:uid       | Admin      | Ativa Auxiliar por id              | :heavy_check_mark: |
| GET    | /api/auxiliares   | /admin/:uid        | Admin      | Trasforma Auxiliar por id em Admin | :heavy_check_mark: |
| GET    | /api/utentes      | /                  | Todos      | Lista de Utentes                   | :heavy_check_mark: |
| POST   | /api/utentes      | /                  | Todos      | Criação de Utente                  | :heavy_check_mark: |
| POST   | /api/utentes      | /update            | Todos      | Atualiza informação de Utente      | :heavy_check_mark: |
| GET    | /api/utentes      | /:uid              | Todos      | Consulta Utente por id             | :heavy_check_mark: |
| GET    | /api/utentes      | /ativos            | Todos      | lista de Utentes Ativos            | :heavy_check_mark: |
| GET    | /api/utentes      | /inativos          | Todos      | Lista de Utentes Inativos          | :heavy_check_mark: |
| GET    | /api/utentes      | /desativar/:uid    | Todos      | Desativar Utente por id            | :heavy_check_mark: |
| GET    | /api/utentes      | /ativar/:uid       | Todos      | Ativar Utente por id               | :heavy_check_mark: |
| GET    | /api/medicamentos | /                  | Todos      | Lista de Medicamento               | :heavy_check_mark: |
| POST   | /api/medicamentos | /                  | Todos      | Criação de Medicamento             | :heavy_check_mark: |
| GET    | /api/medicamentos | /:mid              | Todos      | Procura Medicamento por id         | :heavy_check_mark: |
| GET    | /api/horarios     | /                  | Todos      | Lista de Horarios                  | :heavy_check_mark: |
| GET    | /api/tarefas      | /                  | Todos      | Lista de Tarefas                   | :heavy_check_mark: |
| POST   | /api/tarefas      | /                  | Todos      | Criação de Tarefas                 | :heavy_check_mark: |
| GET    | /api/tarefas      | /:tid              | Todos      | Procura Tarefa por id              | :heavy_check_mark: |
| GET    | /api/tarefas      | /concluidas        | Todos      | Lista de Tarefa concluidas         | :heavy_check_mark: |
| GET    | /api/tarefas      | /inconcluidas      | Todos      | Lista de Tarefa inconcluidas       | :heavy_check_mark: |
| GET    | /api/tarefas      | /concluir/:tid     | Todos      | Concluir Tarefa por id             | :heavy_check_mark: |
| GET    | /api/caixas       | /                  | Admin      | Lista das Caixas                   | :heavy_check_mark: |
| POST   | /api/caixas       | /                  | Todos      | Criação de Caixa                   | :heavy_check_mark: |
| GET    | /api/caixas       | /medicamentos/:uid | Todos      | Lista de Medicamntos por Utente    | :heavy_check_mark: |
| GET    | /api/caixas       | /utentes/:mid      | Todos      | Lista de Utentes por Medicamento   | :heavy_check_mark: |
| GET    | /api/gestao       | /                  | Admin      | Lista das Gestões                  | :heavy_check_mark: |
| POST   | /api/gestao       | /                  | Todos      | Criação de Gestão                  | :heavy_check_mark: |
| GET    | /api/gestao       | /medicamentos/:uid | Admin      | Lista de Medicamntos p/ Auxiliar   | :heavy_check_mark: |
| GET    | /api/gestao       | /auxiliares/:mid   | Admin      | Lista de Auxiliares p/ Medicamento | :heavy_check_mark: |

