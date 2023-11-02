# controle-tarefas-ionic

JSONS para alimentação dos dados:

-------------------------------------------------------------
/atendimento-assunto

{
	"id": null,
	"nome": "Folha de pagamento"
}

{
	"id": null,
	"nome": "Nota fiscal"
}

{
	"id": null,
	"nome": "MEI"
}


-------------------------------------------------------------
/atendimento-meio
{
	"id": null,
	"nome": "Telefone"
}

{
	"id": null,
	"nome": "Pessoalmente"
}

{
	"id": null,
	"nome": "e-mail"
}


-------------------------------------------------------------
/departamento
{
	"id": null,
	"nome": "Fiscal"
}

{
	"id": null,
	"nome": "Pessoal"
}

{
	"id": null,
	"nome": "Legalização"
}


-------------------------------------------------------------
/cidade
{
	"id": null,
	"nome": "Icara",
	"estado" : "SC"
}

{
	"id": null,
	"nome": "Criciuma",
	"estado" : "SC"
}

{
	"id": null,
	"nome": "Salvador",
	"estado" : "BA"
}


-------------------------------------------------------------
/pessoa
{
	"id": null,
	"nome": "PJ do Escritório",
	"email" : "meu.escritorio@gmail.com",
	"tipo_pessoa": "PJ",
	"documento": "000010010000101",
	"endereco": "rua x, 0010",
	"telefone":"4834321111",
	"cidade": {
		"id": 1,
		"nome": "ICARA",
		"estado": "SC"
	},
	"ativo": true,
	"cliente": false,
	"departamento": null,
	"pessoa": null
}


{
	"id": null,
	"nome": "José - Atendente do escritório",
	"email" : "fiscal.escritorio@gmail.com",
	"tipo_pessoa": "PF",
	"documento": "00100100101",
	"endereco": "rua a, 001",
	"telefone":"4834321111",
	"cidade": {
		"id": 1,
		"nome": "ICARA",
		"estado": "SC"
	},
	"ativo": true,
	"cliente": false,
	"departamento": {
		"id": 1,
		"nome": "FISCAL"
	},
	"empregador": {
		"id": 12,
		"nome": "PJ DO ESCRITORIO",
		"email": "meu.escritorio@gmail.com",
		"tipoPessoa": null,
		"documento": "000010010000101",
		"endereco": "rua x, 0010",
		"telefone": "4834321111",
		"cidade": {
			"id": 1,
			"nome": "ICARA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": false,
		"departamento": null,
		"empregador": null	
	}
}

{
	"id": null,
	"nome": "PJ do Cliente A",
	"email" : "cliente.a@gmail.com",
	"tipo_pessoa": "PJ",
	"documento": "000020020000202",
	"endereco": "rua xZ, 0020",
	"telefone":"48343222222",
	"cidade": {
		"id": 2,
		"nome": "CRICIUMA",
		"estado": "SC"
	},
	"ativo": true,
	"cliente": true,
	"departamento": null,
	"pessoa": null
}


{
	"id": null,
	"nome": "Maria - Financeiro do cliente A",
	"email" : "fiscal.escritorio@gmail.com",
	"tipo_pessoa": "PF",
	"documento": "00300300303",
	"endereco": "rua xZ, 0020",
	"telefone":"48343222222",
	"cidade": {
		"id": 2,
		"nome": "CRICIUMA",
		"estado": "SC"
	},
	"ativo": true,
	"cliente": false,
	"departamento": {
		"id": 4,
		"nome": "FINANCEIRO"
	},
	"empregador": {
		"id": 15,
		"nome": "PJ DO CLIENTE A",
		"email": "cliente.a@gmail.com",
		"tipoPessoa": null,
		"documento": "000020020000202",
		"endereco": "rua xZ, 0020",
		"telefone": "48343222222",
		"cidade": {
			"id": 2,
			"nome": "CRICIUMA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": true,
		"departamento": null,
		"empregador": null
	}
}

{
	"id": null,
	"nome": "Pedro - Atendente do escritório",
	"email" : "pessoal.escritorio@gmail.com",
	"tipo_pessoa": "PF",
	"documento": "00500500505",
	"endereco": "rua a, 001",
	"telefone":"4834321111",
	"cidade": {
		"id": 1,
		"nome": "ICARA",
		"estado": "SC"
	},
	"ativo": true,
	"cliente": false,
	"departamento": {
		"id": 2,
		"nome": "PESSOAL"
	},
	"empregador": {
		"id": 12,
		"nome": "PJ DO ESCRITORIO",
		"email": "meu.escritorio@gmail.com",
		"tipoPessoa": null,
		"documento": "000010010000101",
		"endereco": "rua x, 0010",
		"telefone": "4834321111",
		"cidade": {
			"id": 1,
			"nome": "ICARA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": false,
		"departamento": null,
		"empregador": null	
	}
}

-------------------------------------------------------------
/usuario
{
	"id": null,
	"nome": "user_fiscal",	
	"email": "fiscal.escritorio@gmail.com",
	"pessoa":{
		"id": 14,
		"nome": "JOSÉ - ATENDENTE DO ESCRITÓRIO",
		"email": "fiscal.escritorio@gmail.com",
		"tipoPessoa": null,
		"documento": "00100100101",
		"endereco": "rua a, 001",
		"telefone": "4834321111",
		"cidade": {
			"id": 1,
			"nome": "ICARA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": false,
		"departamento": {
			"id": 1,
			"nome": "FISCAL"
		},
		"empregador": {
			"id": 12,
			"nome": "PJ DO ESCRITORIO",
			"email": "meu.escritorio@gmail.com",
			"tipoPessoa": null,
			"documento": "000010010000101",
			"endereco": "rua x, 0010",
			"telefone": "4834321111",
			"cidade": {
				"id": 1,
				"nome": "ICARA",
				"estado": "SC"
			},
			"ativo": true,
			"cliente": false,
			"departamento": null,
			"empregador": null
		}
	},
	"data_cadastro":"2023-01-01",
	"data_atualizacao": null,
	"ativo": true
}

{
	"id": null,
	"nome": "user_pessoal",	
	"email": "pessoal.escritorio@gmail.com",
	"pessoa":{
		"id": 17,
		"nome": "PEDRO - ATENDENTE DO ESCRITÓRIO",
		"email": "pessoal.escritorio@gmail.com",
		"tipoPessoa": null,
		"documento": "00500500505",
		"endereco": "rua a, 001",
		"telefone": "4834321111",
		"cidade": {
			"id": 1,
			"nome": "ICARA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": false,
		"departamento": {
			"id": 2,
			"nome": "PESSOAL"
		},
		"empregador": {
			"id": 12,
			"nome": "PJ DO ESCRITORIO",
			"email": "meu.escritorio@gmail.com",
			"tipoPessoa": null,
			"documento": "000010010000101",
			"endereco": "rua x, 0010",
			"telefone": "4834321111",
			"cidade": {
				"id": 1,
				"nome": "ICARA",
				"estado": "SC"
			},
			"ativo": true,
			"cliente": false,
			"departamento": null,
			"empregador": null
		}
	},
	"data_cadastro":"2023-03-01",
	"data_atualizacao": null,
	"ativo": true	
}


-------------------------------------------------------------
/atendimento
{
	"id": null,
	"detalhes": "maria perguntou sobre como emitir nota fiscal",
	"inicio": "2023-05-16",
	"fim": "2023-05-16",
	"assunto": {
		"id": 2,
		"nome": "NOTA FISCAL"	
	},
	"meio": {
		"id": 3,
		"nome": "E-MAIL"	
	},
	"pessoa": {
		"id": 16,
		"nome": "Maria - Financeiro do cliente A",
		"email" : "fiscal.escritorio@gmail.com",
		"tipo_pessoa": "PF",
		"documento": "00300300303",
		"endereco": "rua xZ, 0020",
		"telefone":"48343222222",
		"cidade": {
			"id": 2,
			"nome": "CRICIUMA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": false,
		"departamento": {
			"id": 4,
			"nome": "FINANCEIRO"
		},
		"empregador": {
			"id": 15,
			"nome": "PJ DO CLIENTE A",
			"email": "cliente.a@gmail.com",
			"tipoPessoa": null,
			"documento": "000020020000202",
			"endereco": "rua xZ, 0020",
			"telefone": "48343222222",
			"cidade": {
				"id": 2,
				"nome": "CRICIUMA",
				"estado": "SC"
			},
			"ativo": true,
			"cliente": true,
			"departamento": null,
			"empregador": null
		}	
	},
	"usuario": {
		"id": 2,
		"nome": "USER_FISCAL",
		"email": "fiscal.escritorio@gmail.com",
		"pessoa": {
			"id": 14,
			"nome": "JOSÉ - ATENDENTE DO ESCRITÓRIO",
			"email": "fiscal.escritorio@gmail.com",
			"tipoPessoa": null,
			"documento": "00100100101",
			"endereco": "rua a, 001",
			"telefone": "4834321111",
			"cidade": {
				"id": 1,
				"nome": "ICARA",
				"estado": "SC"
			},
			"ativo": true,
			"cliente": false,
			"departamento": {
				"id": 1,
				"nome": "FISCAL"
			},
			"empregador": {
				"id": 12,
				"nome": "PJ DO ESCRITORIO",
				"email": "meu.escritorio@gmail.com",
				"tipoPessoa": null,
				"documento": "000010010000101",
				"endereco": "rua x, 0010",
				"telefone": "4834321111",
				"cidade": {
					"id": 1,
					"nome": "ICARA",
					"estado": "SC"
				},
				"ativo": true,
				"cliente": false,
				"departamento": null,
				"empregador": null
			}
		},
		"dataCadastro": null,
		"dataAtualizacao": null,
		"ativo": true
}


{
	"id": null,
	"detalhes": "maria perguntou sobre valor diferente da folha de pagamentos",
	"inicio": "2023-06-01",
	"fim": "2023-06-02",
	"assunto": {
		"id": 1,
		"nome": "FOLHA DE PAGAMENTO"
	},
	"meio": {
		"id": 1,
		"nome": "TELEFONE"
	},
	"pessoa": {
		"id": 16,
		"nome": "Maria - Financeiro do cliente A",
		"email" : "fiscal.escritorio@gmail.com",
		"tipo_pessoa": "PF",
		"documento": "00300300303",
		"endereco": "rua xZ, 0020",
		"telefone":"48343222222",
		"cidade": {
			"id": 2,
			"nome": "CRICIUMA",
			"estado": "SC"
		},
		"ativo": true,
		"cliente": false,
		"departamento": {
			"id": 4,
			"nome": "FINANCEIRO"
		},
		"empregador": {
			"id": 15,
			"nome": "PJ DO CLIENTE A",
			"email": "cliente.a@gmail.com",
			"tipoPessoa": null,
			"documento": "000020020000202",
			"endereco": "rua xZ, 0020",
			"telefone": "48343222222",
			"cidade": {
				"id": 2,
				"nome": "CRICIUMA",
				"estado": "SC"
			},
			"ativo": true,
			"cliente": true,
			"departamento": null,
			"empregador": null
		}	
	},
	"usuario": {
		"id": 3,
		"nome": "USER_PESSOAL",
		"email": "pessoal.escritorio@gmail.com",
		"pessoa": {
			"id": 17,
			"nome": "PEDRO - ATENDENTE DO ESCRITÓRIO",
			"email": "pessoal.escritorio@gmail.com",
			"tipoPessoa": null,
			"documento": "00500500505",
			"endereco": "rua a, 001",
			"telefone": "4834321111",
			"cidade": {
				"id": 1,
				"nome": "ICARA",
				"estado": "SC"
			},
			"ativo": true,
			"cliente": false,
			"departamento": {
				"id": 2,
				"nome": "PESSOAL"
			},
			"empregador": {
				"id": 12,
				"nome": "PJ DO ESCRITORIO",
				"email": "meu.escritorio@gmail.com",
				"tipoPessoa": null,
				"documento": "000010010000101",
				"endereco": "rua x, 0010",
				"telefone": "4834321111",
				"cidade": {
					"id": 1,
					"nome": "ICARA",
					"estado": "SC"
				},
				"ativo": true,
				"cliente": false,
				"departamento": null,
				"empregador": null
			}
		},
		"dataCadastro": null,
		"dataAtualizacao": null,
		"ativo": true	
	}
}
