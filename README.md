<h1>AWS Foundation: Desafio 3 DIO: </h1>


<h4> Conceitos </h4>:
> Função Lambda: unidade independente de implantação, como microserviço. Realiza uma única tarefa. 

> Evento: é a ação que a função Lambda foi escrita para gerar. Ao ser executada, a função gera o evento no Serverless Framework. Evento de infraestrutura pode ser: requisição de API Gateway por um endpoint, fazer upload de arquivo no bucket do S3, gerar alerta no CloudWatch...

> Recursos: são componentes de infra da AWS usados pela função, tal como DynamoDB, bucket S3, tópico SNS, dentre outros.  

> Serviços: é a unidade organizacional do Framework. Pode se pensar como arquivo do projeto, onde funções, eventos e recursos a serem utilizados são definidos. Arquivo DEVE ser escrito como serverless.yml ou serverless.json, pois a nuvem buscará este nome. O Serverless Framework exporta nativamente o objeto JSON em serverless.js,serverless.ts (typescript) ou YAML (serverless.yml) para o/do projeto. 

> Plugins: Usados para sobreescrever ou estender funcionalidade do Serverless Framework. Cada serverless.yml pode contar propriedade chamada plugins: em seu arquivo. 

<h4> Na AWS: </h4>
> IAM: 
1. Usuário com chave de acesso (CLI) = Enable Programmatic access
2. Permissions de AdministratorAccess
3. Adição do usuário ao projeto serverless a ser criado (pode ser feito na etapa de configuração do serverless, em Local, ou via eventos SDK - em packege-lock.json).

> ARNs utilizados: CloudFormation, API Gateway, Lambda e DynamoDB.

<h4> Local: </h4>
> Instalação node.js e npm, seguido de instalação e configuração do serverless framework (desenvolvido em node.js): 
1. npm i -g serverless
2. serverless (pode inserir acesso agora ou depois via AWS)
2.1 caso chave de acesso não seja atribuída, variável de credencial AWS_PROFILE no serverless.yml fica setado 'default'
3. nomear projeto REST API/ HTTP API
4. cd pasta-projeto + code . (para entrar na IDE de desenvolvimento)

> Configuração do Serverless Framework como PaaS de integração funções Lambda sobre DynamoDB, a ser utilizada no projeto-dio-serverless.
1. serverless.yml como "IaaS" da integração.
2. criação diretório src, handler.js vira hello.js no trabalho
3. ajuste do handler no serverless.yml, ou quebrará o deploy
4. serverless deploy -v
5. instalar dependências para interação entre Lambda <-> DynamoDB:
-npm init 
-npm i uuid aws-sdk
6. desenvolver as funções CRUD em /src e ajustar o recurso sobre o qual funções atuarão em serverless.yml 

> Configuração de conexão Serverless Framework ao CloudFormation, serviço AWS de provisionamento automático do código Serverless Framework para o DynamoDB exportando suas dependências via package-lock.json

<h4> Postman: </h4>
- Usar chave de acesso e senha de acesso geradas para fazer CRUD.

<h1> AWS Foundation: Desafio 4 DIO: </h1>

<h4> Na AWS: </h4>
> Arns utilizadas:
-- Cognito (gerenciar o acesso via user pool com credenciais sem MFA, verificar email via link e criar app client para app integration com provedor de identidade -> OAuth 2.0 com flow permitido e permissão implícita; por fim, adicionar nome de domínio)
-- DynamoDB (criar tabela e PK manualmente)
-- Lambda (adicionar inline policy para putitem no dynamodb)

-- API Gateway:
> Pré-cognito: 
- criação manual de REST API - lembrando que este projeto é em REGIÃO ÚNICA,  e em seguida fazer integração com proxy da função Lambda para o deploy puxar código em lambda; 

> Após ajuste do Cognito:
- criar o autorizador via user pool criado, em recursos adicioná-lo para chamada da API no postman poder utilizá-lo

<h4> No POSTMAN: </h4>
> Pré-cognito: usar acesso via chave e o endpoint gerado no API gateway, conforme desafio 3.

> Pós-cognito:
- Autorização Type - OAuth 2.0 para fazer requests
- Usar URL da Cognito > vai chegar novo token de acesso e, durante a inserção de item, fazer request via autorização com bearer token para chamada ser bem sucedida.

* lambda-completo.js traz o código da função CRUD do projeto na íntegra.





