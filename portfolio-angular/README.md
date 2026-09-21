# PortfolioAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Navegação e Layout 14
Nesta etapa foi criada a estrutura principal de navegação do portfolio.
- app.routes.ts: possui as quatro rotas da aplicação
- app.html: menu usando routerLink e routerLinkActive
- app.css: estilização do link ativo no menu
- Sobre: apresenta informações sobre mim e o laboratorio 3D que estou desenvolvendo
- mat-drawer: menu responsivo para navegação em dispositivos menores

Com isso a aplicação passou a ter uma estrutura de navegação completa tanto no computador quanto no celular.



## API e Banco de Dados 15
Para rodar o projeto:
1. Instale as dependências necessárias do projeto.
2. Crie o banco executando:
sudo mariadb < sql/setup.sql
3. Inicie a API:
php -S 0.0.0.0:8000

Endpoints:
- api/projetos.php: lista os projetos publicados
- api/tecnologias.php: lista as tecnologias
- api/tecnologias.php?id=ID: busca uma tecnologia pelo id

O sql/setup.sql recria o banco, o usuario e as tabelas projetos e tecnologias.
A API retorna JSON, possui CORS e usa prepare() nas consultas que recebem dados pela URL.



## 🎯 Autoavaliação 17
Conceito pretendido: A

Justificativa (cite o arquivo de cada critério):
- Consumo da API (Projetos): projeto.service.ts (GET) + projetos.ts (subscribe)
- Catalogo + botao GitHub: tecnologia.service.ts + projetos.html (mat-card-actions)
- Boas praticas: a URL/HTTP fica no service; o componente so exibe
- Uso do asyncpipe para não ser necessario recarregar a tela para mostrar os dado
- Uso de @for e @ifs para quando der algum problema no backend mostrar mensagem de erro e uso do for para



## 🎯 Autoavaliação 18

Conceito pretendido: A

Justificativa (cite o arquivo de cada critério):
- Formulario reativo + validações: contato.ts (Validators) + contato.html (mensagens usando touched e invalid)
- Botao de envio: contato.html ([disabled]="form.invalid || enviando") para não enviar formulario invalido ou enquanto estiver enviando
- Estado de envio: contato.ts + contato.html (uso da variavel enviando e texto "Enviando...")
- Tratamento de sucesso e erro: contato.ts (subscribe com next e error, form.reset() quando der certo e reabilita o botao quando der erro)
- Erros do backend: contato.ts (HttpErrorResponse + err.error?.erros) para mostrar os erros que vierem da API
- Backend: api/contato.php (php://input, validação dos campos, prepare(), retorno 400 quando tiver erro e 201 quando salvar)
- Acessibilidade/UX: contato.html (labels com for/id e mensagens de erro em texto) + contato.ts (foco no primeiro campo invalido)
- Autoavaliação: esta seção do README



## 🎯 Autoavaliação 19
Conceito pretendido: A
Justificativa:
- Gestão completa: gestao.ts + gestao.html (listar, adicionar, editar, excluir, atualizar sem F5 e resetar o formulário)
- Status: gestao.html + projeto.service.ts + api/projetos.php (rascunho/publicado, gestão mostra todos e portfólio só publicados)
- Erros e UX: gestao.ts + gestao.html (erros visíveis ao carregar, salvar e excluir + mensagem para lista vazia)
- Backend: api/projetos.php (GET, POST, PUT, DELETE e OPTIONS, prepare/execute e retornos 200, 201, 204, 400, 404 e 405)
- Boas práticas: requisições ficam no projeto.service.ts e não no gestao.ts

O mesmo api/projetos.php faz varias operações porque verifica o REQUEST_METHOD e executa uma ação diferente para cada verbo HTTP.
O estado salvando bloqueia o botão durante o POST e ajuda a impedir dois cadastros caso o usuario clique duas vezes rapidamente.
Depois de salvar uso carregar(), que consulta novamente o servidor. No excluir uso filter(), que economiza uma requisição, mas pode ficar desatualizado se o banco mudar por fora.
Como polimento foi criado um estado de lista vazia em gestao.html. Fonte pesquisada: Nielsen Norman Group sobre empty states.
O OPTIONS funciona como preflight: o navegador verifica antes se o servidor permite métodos como DELETE.

Um <a href> faz GET e não DELETE, então não substitui o botão de excluir. Evidência:
curl -i "URL/api/projetos.php?id=5"
curl -i -X DELETE "URL/api/projetos.php?id=5"

## Testes da API
- 400: curl -i -X POST "URL/api/projetos.php" -H "Content-Type: application/json" -d '{}' → [colar resultado]
- 404: curl -i -X DELETE "URL/api/projetos.php?id=999999" → [colar resultado]
- 405: curl -i -X PATCH "URL/api/projetos.php" → [colar resultado]
- OPTIONS: curl -i -X OPTIONS "URL/api/projetos.php" → [colar 204 + Access-Control-Allow-Methods]