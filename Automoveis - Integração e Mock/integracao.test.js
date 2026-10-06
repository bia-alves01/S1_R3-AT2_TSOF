const request = require('supertest');
const app = require('./app'); // Altere para o caminho do seu arquivo principal da aplicação/API

describe('Suíte de Testes - Veículos', () => {

  // ==========================================
  // CLIENTES
  // ==========================================
  describe('Módulo de Clientes', () => {
    
    // CT-001: Cadastrar cliente com dados válidos[cite: 1]
    test('CT-001 - Deve cadastrar cliente com dados válidos', async () => {
      const novoCliente = {
        nome: 'João da Silva',
        cpf: '12345678900',
        cep: '13360000',
        logradouro: 'Rua Flores',
        bairro: 'Centro',
        cidade: 'Sumaré',
        uf: 'SP',
        numero: '100',
        complemento: 'Apto 12'
      };

      const response = await request(app)
        .post('/clientes')
        .send(novoCliente);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    // CT-002: Editar cliente[cite: 1]
    test('CT-002 - Deve editar um cliente cadastrado', async () => {
      const clienteId = 1; // ID existente conforme pré-condição[cite: 1]
      const dadosAtualizados = {
        nome: 'João da Silva Editado',
        logradouro: 'Avenida Central',
        numero: '200'
      };

      const response = await request(app)
        .put(`/clientes/${clienteId}`)
        .send(dadosAtualizados);

      expect(response.statusCode).toBe(200);
    });

    // CT-003: Listar clientes cadastrados[cite: 1]
    test('CT-003 - Deve listar clientes cadastrados', async () => {
      const response = await request(app)
        .get('/clientes');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

  });

  // ==========================================
  // MONTADORAS
  // ==========================================
  describe('Módulo de Montadoras', () => {

    // CT-004: Cadastrar montadora com dados válidos[cite: 1]
    test('CT-004 - Deve cadastrar montadora com dados válidos', async () => {
      const novaMontadora = {
        nome: 'Toyota',
        paisOrigem: 'Japão'
      };

      const response = await request(app)
        .post('/montadoras')
        .send(novaMontadora);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    // CT-005: Editar dados de uma montadora cadastrada[cite: 1]
    test('CT-005 - Deve editar dados de uma montadora cadastrada', async () => {
      const montadoraId = 1; // ID existente conforme pré-condição[cite: 1]
      const dadosAtualizados = {
        nome: 'Toyota do Brasil',
        paisOrigem: 'Brasil'
      };

      const response = await request(app)
        .put(`/montadoras/${montadoraId}`)
        .send(dadosAtualizados);

      expect(response.statusCode).toBe(200);
    });

    // CT-006: Listar montadoras cadastradas[cite: 1]
    test('CT-006 - Deve listar montadoras cadastradas', async () => {
      const response = await request(app)
        .get('/montadoras');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

  });

  // ==========================================
  // VEÍCULOS
  // ==========================================
  describe('Módulo de Veículos', () => {

    // CT-007: Cadastrar veículo com dados válidos[cite: 1]
    test('CT-007 - Deve cadastrar veículo com dados válidos', async () => {
      const novoVeiculo = {
        idMontadora: 1,
        idCliente: 1,
        modelo: 'Corolla',
        placa: 'ABC1D23',
        ano: 2023,
        cor: 'Prata',
        valor: 120000.00
      };

      const response = await request(app)
        .post('/veiculos')
        .send(novoVeiculo);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

  });

});