# medLar_Lei19

# Planeamento da Medicação Semanal de Utentes num Lar
Processo de login para auxiliares – Número de identificação interno (identificador único) + password;

· Criar uma ficha da medicação atual para cada utente – inclui a medicação habitual e a medicação temporária:

  o  Nome do Paciente;

  o  Número de Processo do Paciente (identificador único);

  o  Data de início e data de fim de cada medicamento;

  o  Nome do medicamento – encontrar repositório de medicamentos;

  o  Especificar para cada período do dia (pequeno-almoço, almoço, lanche, jantar e ceia) a quantidade a ser administrada, bem como a unidade (comprimidos, gramas, mililitros, gotas), para cada dia da semana (segunda-feira a domingo);

  o  Observações.

· Edição da ficha da medicação atual de cada utente – adicionar, editar ou remover medicamentos;

· Auxiliar na preparação da caixa de medicamentos semanal de cada utente – ter uma lista de tarefas a realizar e confirmar a realização de cada tarefa (todas as semanas o processo deve ser repetido; deve ser possível gerir alterações na caixa de medicamentos semanal durante a semana, como por exemplo, caso um novo medicamento for adicionado nesse período);

· Área de lembretes para indicar a falta de stock de determinados medicamentos – permitir depois confirmar a realização da tarefa.

# Ferramentas:
  · Figma – the collaborative interface design tool;
  · Visual Studio Code;
  · Android Studio – emulador e para fazer a sincronização dos ficheiros (versões);
  · MySQL Workbench.

# Tecnologias:
  · Frontend:React Native – NativeBase (ui components); react-native-navigation (navegação); Formik/Yup (criar formulários e a sua validação); Redux (gerir o estado da app);
  · REST API:Node.js – Express (Node.js web application framework); body-parser (to handle HTTP POST request in Express.js version 4 and above/extract the entire body portion of an incoming request stream and exposes it on req.body); Sequelize (Node.js ORM (Object-relational mapping)); bcrypt (cifrarpasswords); jsonwebtoken (implementar JSON Web Tokens); nodemon (automatically restart server after changes);
  · Database:MySQL
