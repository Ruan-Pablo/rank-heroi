# Rank do Heroi
###### Classificador de rank de heroi baseado no saldo de rank (vitoria - derrota). Esse repositorio é parte de um desafio do bootcamp da DIO.

Minha ideia aqui vai ser evoluir o código feito em outra parte do bootcamp. [Link do repositório](https://github.com/Ruan-Pablo/classificador-nivel-heroi)

## Detalhes

- Tem quantidade de herois ilimitada
- Todos contra todos (ganha quem tiver mais sorte)
- todos os herois tem revanche com a quantidade estabelecida de rodadas

## Como está funcionando agora

Eu recebo um array no construtor da classe herois com os herois. Para fazer eles lutarem entre si, percorro o array com os herois e faço todos batalharem com todos.

## Problema

Equilibrar valores de: atribuição de xp, esquiva, vitoria, derrota, e valores para rank, vida, ataque, para que eles não gerem valores absurdos. 
