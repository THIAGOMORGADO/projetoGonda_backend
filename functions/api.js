const express = require('express');
const app = express();
const cors =require('cors');

const serverless = require('serverless-http');

const router = express.Router();

router.use(express.json());
router.use(cors({origin: '*'}));

const Livros = require('../models/livros');
const Contato = require('../models/contatos');

router.get('/', (req, res) => {
  res.send('Backend Renato Gonda - 160922 | 8:58')
  console.log('entrou no index.js...');
});

router.get('/livros', async (req, res) => {
  const livros = await Livros.findAll()
  res.send(livros);
});

router.get('/livros/:id', async (req, res) => {
  const {id} = req.params;
  const livro = await Livros.findAll({ 
      where:{
        codigo:id
      }
  })
  res.send(livro);
});

router.post('/livros', async (req, res) => {
  const {titleparams, title, author, historico, release, pretexto, preco_venda, capa_img} = req.body; 
  await Livros.create({
    titleparams, title, author, historico, release, pretexto, preco_venda, capa_img
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

router.put('/livros/:id', async (req, res) => {
  const {id} = req.params;
  const {titleparams, title, author, historico, release, pretexto, preco_venda, capa_img} = req.body;
  await Livros.update({
    titleparams, title, author, historico, release, pretexto, preco_venda, capa_img
  },{ 
    where:{
      codigo:id
    }
  })
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

router.delete('/livros/:id', async (req, res) => {
  const {id} = req.params;
  await Livros.destroy({
    where:{
      codigo:id
    }
  })
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

router.get("/contatos", async (req, res) => {
  const contatos = await Contato.findAll();
  res.send(contatos);
});

router.post("/contatos", async (req, res) => {
  const { name, email, whatsapp, message, status } = req.body;

  await Contato.create({name, email, whatsapp, message, status})
  .then(() => {
  return res.json({
      erro: false,
      mensagem: `Contato cadastrado com sucesso!`
  });
  }).catch(() => {
    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Contato não cadastrado com sucesso!"
    });
  });

});
router.put("/contatos/:id", async (req, res) =>{
  const {id} = req.params;
  const {status} = req.body;

  await Contato.update({status},{
    where:{
      id: id
    }
  }).then(() => {
    return res.json({
      erro: false,
      mensagem: `Contato atualizado com sucesso!`
  });
  }).catch(() => {
    return res.status(400).json({
        erro: true,
        mensagem: "Erro: Contato não atualizada com sucesso!"
    });
  });
});


app.use('/', router);

module.exports.handler = serverless(app);
