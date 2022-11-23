const express = require('express');
const cors =require('cors');

const port = process.env.PORT || 4002;

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

const Livros = require('./models/livros');

app.get('/', (req, res) => {
    res.send('Backend Renato Gonda - 120922 | 13:33')
    console.log('entrou no index.js...');
});

app.get('/livros', async (req, res) => {
    const livros = await Livros.findAll()
    res.send(livros);
    // console.log(livros);
});

app.get('/livros/:id', async (req, res) => {
    const {id} = req.params;

    const livro = await Livros.findAll({ 
        where:{
            codigo:id
        }
    })
    res.send(livro);
    // console.log(livro);
});

app.post('/livros', async (req, res) => {
    const {codigo, titleparams, title, author, historico, pretexto, preco_venda, capa_img} = req.body; 
    await Livros.create({
        codigo, titleparams, title, author, historico, pretexto, preco_venda, capa_img
    })
    .then(() => {
      return res.json({
          erro: false,
          mensagem: `Livro cadastrado com sucesso!`
      });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Livro não cadastrado com sucesso!"
        });
    });
});

app.put('/livros/:id', async (req, res) => {
    const {id} = req.params;
    const {codigo, titleparams, title, author, historico, pretexto, preco_venda, capa_img} = req.body;
    await Livros.update({
      codigo, titleparams, title, author, historico, pretexto, preco_venda, capa_img
    },{ where:{codigo:id}})
    .then(() => {
      return res.json({
          erro: false,
          mensagem: `Livro atualizada com sucesso!`
      });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Livro não atualizado com sucesso!"
        });
    });
});

app.delete('/livros/:id', async (req, res) => {
    const {id} = req.params;
    await Livros.destroy({where:{codigo:id}})
    .then(() => {
      return res.json({
          erro: false,
          mensagem: `Livro removido com sucesso!`
      });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Livro não removido com sucesso!"
        });
    });
});


app.listen(port, () => {
    console.log(`App Rodando...`)
});
