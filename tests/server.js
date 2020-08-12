const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('../app');

const baseDeDatos = require('../utilidades/baseDeDatos');

const Usuario = require('../modelos/Usuario');
const Url = require('../modelos/urls');

const should = chai.should();

chai.use(chaiHttp);

describe('Usuario', () => {
  describe('/usuario/registrar/', () => {
    beforeEach(async () => {
      await Usuario.deleteMany({});
    });
    describe('Si faltan campos o son incorrectos ', () => {
      it('Tiene que devolver un 400 si se pasa un json vació', (done) => {
        chai.request(server)
          .post('/usuario/registrar')
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si no se pasa un correo', (done) => {
        const nuevoUsuario = {
          nombre: 'test',
          apellido: 'test',
          alias: 'test1',
          contra: 'test',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si no se pasa un nombre', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          apellido: 'test',
          alias: 'test1',
          contra: 'test',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si no se pasa un apellido', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          nombre: 'test',
          alias: 'test1',
          contra: 'test',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si no se pasa un alias', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          nombre: 'test',
          apellido: 'test1',
          contra: 'test',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si no se pasa una contraseña', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          nombre: 'test',
          apellido: 'test1',
          alias: 'test',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si no se pasa un correo correcto', (done) => {
        const nuevoUsuario = {
          correo: 'aadada',
          nombre: 'test',
          apellido: 'test',
          alias: 'test1',
          contra: 'test',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
    it('Tiene que devolver un 400 si no se pasa un nombre correcto', (done) => {
      const nuevoUsuario = {
        correo: 'test@test.com',
        nombre: '123@',
        apellido: 'test',
        alias: 'test1',
        contra: 'test',
      };
      chai.request(server)
        .post('/usuario/registrar')
        .send(nuevoUsuario)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Tiene que devolver un 400 si no se pasa un apellido correcto', (done) => {
      const nuevoUsuario = {
        correo: 'test@test.com',
        nombre: 'test',
        apellido: '132',
        alias: 'test1',
        contra: 'test',
      };
      chai.request(server)
        .post('/usuario/registrar')
        .send(nuevoUsuario)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Tiene que devolver un 400 si no se pasa un alias correcto', (done) => {
      const nuevoUsuario = {
        correo: 'test@test.com',
        nombre: 'test',
        apellido: 'test',
        alias: '@ewq',
        contra: 'test',
      };
      chai.request(server)
        .post('/usuario/registrar')
        .send(nuevoUsuario)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Tiene que devolver un 400 si no se pasa una contraseña correcta', (done) => {
      const nuevoUsuario = {
        correo: 'test@test.com',
        nombre: 'test',
        apellido: 'test',
        alias: 'test',
        contra: '123',
      };
      chai.request(server)
        .post('/usuario/registrar')
        .send(nuevoUsuario)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    describe('Si los datos son correctos', () => {
      it('Tiene que devolver un 200 si todos los parámetros son correctos', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          nombre: 'test',
          apellido: 'test',
          alias: 'test',
          contra: '123jdkasjna3223jfdk',
        };
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            Usuario.find({}, (err, todosLosUsuarios) => {
              res.should.have.status(200);
              todosLosUsuarios.should.have.lengthOf(1);
              done();
            });
          });
      });
      it('Tiene que devolver un 400 si todos los parámetros son correctos pero ya existe un usuario con ese correo', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          nombre: 'test',
          apellido: 'test',
          alias: 'test',
          contra: '123',
        };
        before(async () => {
          await baseDeDatos.registrarUsuario({ ...nuevoUsuario, alias: 'sadasd', hashDeContra: 'lkalkdmals' });
        });
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
      it('Tiene que devolver un 400 si todos los parámetros son correctos pero ya existe un usuario con ese alias', (done) => {
        const nuevoUsuario = {
          correo: 'test@test.com',
          nombre: 'test',
          apellido: 'test',
          alias: 'test',
          contra: '123',
        };
        before(async () => {
          await baseDeDatos.registrarUsuario({ ...nuevoUsuario, correo: 'sadasd@test.com', hashDeContra: 'lkalkdmals' });
        });
        chai.request(server)
          .post('/usuario/registrar')
          .send(nuevoUsuario)
          .end((err, res) => {
            Usuario.find({}, (err, todosLosUsuario) => {
              res.should.have.status(400);
              todosLosUsuario.should.have.lengthOf(0);
              done();
            });
          });
      });
    });
  });
  describe('/usuario/login/', () => {
    const correo = 'test@test.com';
    const contra = 'test';
    beforeEach(async () => {
      const nuevoUsuario = {
        correo,
        nombre: 'test',
        apellido: 'test',
        alias: 'test1',
        hashDeContra: '$2b$12$gh0LN0WVn608MedDq8F4dOHFehNCnW8shoVWqLTy1/UmurU9U/JbG',
      };
      await Usuario.create(nuevoUsuario);
    });
    it('Si la contraseña es correcta tiene que retornar un token y un 200', (done) => {
      chai.request(server)
        .post('/usuario/login/')
        .send({ correo, contra })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          const { token } = res.body;
          expect(token.length).to.be.at.least(2);
          done();
        });
    });
    it('Si la contraseña es incorrecta tiene que retornar un 500 y no un token', (done) => {
      chai.request(server)
        .post('/usuario/login/')
        .send({ correo, contra: 'kdaka' })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.not.have.property('token');
          done();
        });
    });
    describe('/usuario/perfil/', () => {
      it('Sin un token tiene que retornar un 403', (done) => {
        chai.request(server)
          .get('/usuario/perfil/')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.not.have.property('usuario');
            done();
          });
      });
    });
    it('Con un token vencido tiene que retornar un 403', (done) => {
      const tokenVencido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJ0ZXN0MUB0ZXN0LmNvbSIsImlhdCI6MTU5NzE5MjU0NywiZXhwIjoxNTk3MTk2MTQ3fQ.op4Kdz1APbpkCKTkREiyi0ZzcZ_PqC7C8-kPErjgudE';
      chai.request(server)
        .get('/usuario/perfil/')
        .set({ Authorization: `Bearer ${tokenVencido}` })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.not.have.property('usuario');
          done();
        });
    });
    it('Con un token correcto tiene que retornar un 200 y información del perfil', (done) => {
      chai.request(server)
        .post('/usuario/login/')
        .send({ correo, contra })
        .end((err, resConToken) => {
          const { token } = resConToken.body;
          chai.request(server)
            .get('/usuario/perfil/')
            .set({ Authorization: `${token}` })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('correo');
              done();
            });
        });
    });
  });
});

describe('Url', () => {
  describe('/acortarUrl/', () => {
    const correo = 'test@test.com';
    const contra = 'test';
    beforeEach(async () => {
      const nuevoUsuario = {
        correo,
        nombre: 'test',
        apellido: 'test',
        alias: 'test1',
        hashDeContra: '$2b$12$gh0LN0WVn608MedDq8F4dOHFehNCnW8shoVWqLTy1/UmurU9U/JbG',
      };
      await Usuario.create(nuevoUsuario);
      await Url.deleteMany({});
    });
    it('Con un token correcto tiene que retornar un 200 y información de la url creada', (done) => {
      chai.request(server)
        .post('/usuario/login')
        .send({ correo, contra })
        .end((err, resConToken) => {
          const { token } = resConToken.body;
          chai.request(server)
            .post('/acortarUrl/')
            .set({ Authorization: `${token}` })
            .send({
              urlOriginal: 'http://www.sur.com',
              urlAcortada: 'sur',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('urlAcortada');
              done();
            });
        });
    });
    it('Con un token vencido tiene que retornar un 403 y no la información de la url creada', (done) => {
      const tokenVencido = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJ0ZXN0MUB0ZXN0LmNvbSIsImlhdCI6MTU5NzE5MjU0NywiZXhwIjoxNTk3MTk2MTQ3fQ.op4Kdz1APbpkCKTkREiyi0ZzcZ_PqC7C8-kPErjgudE';
      chai.request(server)
        .post('/acortarUrl/')
        .set({ Authorization: `${tokenVencido}` })
        .send({
          urlOriginal: 'http://www.sur.com',
          urlAcortada: 'sur',
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.not.have.property('urlAcortada');
          done();
        });
    });
    it('Con un token correcto, pero una url repetida tiene que retornar un 400 y no la información de la url creada', (done) => {
      chai.request(server)
        .post('/usuario/login')
        .send({ correo, contra })
        .end((err, resConToken) => {
          const { token } = resConToken.body;
          chai.request(server)
            .post('/acortarUrl/')
            .set({ Authorization: `${token}` })
            .send({
              urlOriginal: 'http://www.sur.com',
              urlAcortada: 'coso',
            })
            .end(() => {
              chai.request(server)
                .post('/acortarUrl/')
                .set({ Authorization: `${token}` })
                .send({
                  urlOriginal: 'http://www.sur.com',
                  urlAcortada: 'coso',
                })
                .end((err, res) => {
                  res.should.have.status(400);
                  done();
                });
            });
        });
    });
  });
  describe('/:urlAcortada/', () => {
    it('Si la url no es correcta tiene que recibir un 404', (done) => {
      const urlNoExistente = 'lakfkm';
      chai.request(server)
        .get(`/${urlNoExistente}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('/:urlAcortada/', () => {
    it('Si la url es correcta (la url acortada existe en la db y la url original es un dominio registrado) tiene que recibir un 200', (done) => {
      const urlExistente = 'coso';
      chai.request(server)
        .get(`/${urlExistente}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
