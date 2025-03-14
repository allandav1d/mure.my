# mure.my - Serviço de Subdomínios para Implantação Rápida

![mure.my](https://mure.my/og-image.png)

## Visão Geral

mure.my é um serviço de subdomínios que permite aos desenvolvedores implantar aplicações instantaneamente com subdomínios seguros pré-configurados com Cloudflare. Este projeto é um conceito de portfólio demonstrando habilidades em desenvolvimento web moderno.

## Tecnologias Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime/Gerenciador de Pacotes**: [Bun](https://bun.sh/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Radix UI](https://www.radix-ui.com/)
- **Gerenciamento de Formulários**: [React Hook Form](https://react-hook-form.com/)
- **Validação**: [Zod](https://zod.dev/)
- **Gráficos**: [Recharts](https://recharts.org/)

## Funcionalidades

- Implantação instantânea de aplicações com subdomínios seguros
- Dashboard para gerenciamento de subdomínios
- Integração com Cloudflare para segurança e desempenho
- Interface de usuário moderna e responsiva
- Tema claro/escuro

## Estrutura do Projeto

```
mure.my/
├── app/                  # Diretório principal da aplicação Next.js
│   ├── dashboard/        # Páginas do dashboard
│   ├── login/            # Páginas de autenticação
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal da aplicação
│   └── page.tsx          # Página inicial
├── components/           # Componentes reutilizáveis
│   ├── dashboard/        # Componentes específicos do dashboard
│   ├── domain/           # Componentes relacionados a domínios
│   ├── ui/               # Componentes de UI genéricos
│   ├── footer.tsx        # Componente de rodapé
│   └── header.tsx        # Componente de cabeçalho
├── contexts/             # Contextos React
├── hooks/                # Hooks personalizados
├── lib/                  # Utilitários e funções auxiliares
├── public/               # Arquivos estáticos
└── styles/               # Estilos adicionais
```

## Instalação e Execução

### Pré-requisitos

- [Bun](https://bun.sh/) 1.0.0 ou superior
- Node.js 18.x ou superior (para compatibilidade com algumas dependências)

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/mure-my.git
   cd mure-my
   ```

2. Instale as dependências:
   ```bash
   bun install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   bun dev
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Credenciais de Demonstração

Para acessar a demonstração, utilize:
- **Email**: demo@example.com
- **Senha**: password123

**Nota**: Este é um projeto de demonstração e os dados não persistem entre sessões.

## Build para Produção

```bash
bun run build
bun start
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto é um conceito de portfólio e não está disponível para uso comercial sem permissão.

## Contato

Para mais informações, visite [meu portfólio](https://allandavid.eu). 