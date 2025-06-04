// Mocks de usuários específicos para o sistema
const USER_MOCKS = {
    // Usuário padrão João Silva
    'joao.silva@aluno.wyden.edu.br': {
        id: 'student_joao',
        name: 'João Silva Santos',
        email: 'joao.silva@aluno.wyden.edu.br',
        matricula: '2024012345',
        curso: 'Sistemas de Informação',
        periodo: '3º Semestre',
        campus: 'São Paulo - Vila Mariana',
        situacao: 'Ativo',
        cr: '8.7',
        cargaHoraria: '960 / 3.200 horas',
        cpf: '416.555.788-98',
        rg: '52.792.785-5',
        dataNascimento: '13/12/2000',
        telefone: '(11) 99999-8888',
        tipoSanguineo: 'O+',
        numeroCarteirinha: 'WYD240123450001',
        formaIngresso: 'Vestibular Wyden 2024.1',
        turno: 'Noturno',
        type: 'student',
        hasPhoto: true,
        photoPath: 'photos/joao-silva.jpg',
        disciplinas: [
            {
                codigo: 'SI301',
                nome: 'Programação Web',
                creditos: 4,
                nota: 8.5,
                situacao: 'Aprovado'
            },
            {
                codigo: 'MAT201',
                nome: 'Estatística',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'SI302',
                nome: 'Banco de Dados',
                creditos: 4,
                nota: 9.2,
                situacao: 'Aprovado'
            },
            {
                codigo: 'SI303',
                nome: 'Sistemas Operacionais',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'SI304',
                nome: 'Engenharia de Software',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            }
        ]
    },

    // Gustavo Honorato Nicolau
    'gustavo.honorato@aluno.wyden.edu.br': {
        id: 'student_gustavo',
        name: 'Gustavo Honorato Nicolau',
        email: 'gustavo.honorato@aluno.wyden.edu.br',
        matricula: '202401085432',
        curso: 'Sistemas de Informação',
        periodo: '3º Semestre',
        campus: 'São Paulo - Vila Mariana',
        situacao: 'Ativo',
        cr: '9.1',
        cargaHoraria: '960 / 3.200 horas',
        cpf: '416.555.788-98',
        rg: '52.792.785-5',
        dataNascimento: '13/12/2000',
        telefone: '(19) 97102-9973',
        tipoSanguineo: 'O+',
        numeroCarteirinha: 'WYD2401765450001',
        formaIngresso: 'Vestibular Wyden 2024.1',
        turno: 'Noturno',
        type: 'student',
        hasPhoto: true,
        photoPath: 'photos/gustavo-honorato.jpg',
        disciplinas: [
            {
                codigo: 'SI301',
                nome: 'Programação Web Avançada',
                creditos: 4,
                nota: 9.8,
                situacao: 'Aprovado'
            },
            {
                codigo: 'MAT201',
                nome: 'Estatística Aplicada',
                creditos: 4,
                nota: 8.9,
                situacao: 'Aprovado'
            },
            {
                codigo: 'SI302',
                nome: 'Banco de Dados II',
                creditos: 4,
                nota: 9.5,
                situacao: 'Aprovado'
            },
            {
                codigo: 'SI303',
                nome: 'Sistemas Operacionais',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'SI304',
                nome: 'Engenharia de Software',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'SI305',
                nome: 'Redes de Computadores',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'SI306',
                nome: 'Análise e Projeto de Sistemas',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            }
        ]
    },

    // Guilherme Batista
    'guilherme.batista@aluno.wyden.edu.br': {
        id: 'student_guilherme',
        name: 'Guilherme Batista Silva',
        email: 'guilherme.batista@aluno.wyden.edu.br',
        matricula: '202401078945',
        curso: 'Administração',
        periodo: '2º Semestre',
        campus: 'São Paulo - Vila Mariana',
        situacao: 'Ativo',
        cr: '8.3',
        cargaHoraria: '640 / 3.200 horas',
        cpf: '474.090.428-42',
        rg: '37.741.035-4',
        dataNascimento: '11/11/2000',
        telefone: '(19) 98140-0748',
        tipoSanguineo: 'A+',
        numeroCarteirinha: 'WYD2401789450001',
        formaIngresso: 'ENEM 2024.1',
        turno: 'Matutino',
        type: 'student',
        hasPhoto: true,
        photoPath: 'photos/guilherme-batista.jpg',
        disciplinas: [
            {
                codigo: 'ADM201',
                nome: 'Teoria Geral da Administração',
                creditos: 4,
                nota: 8.7,
                situacao: 'Aprovado'
            },
            {
                codigo: 'ECO101',
                nome: 'Economia Empresarial',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'MAT102',
                nome: 'Matemática Financeira',
                creditos: 4,
                nota: 8.1,
                situacao: 'Aprovado'
            },
            {
                codigo: 'DIR201',
                nome: 'Direito Empresarial',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'PSI101',
                nome: 'Comportamento Organizacional',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            }
        ]
    },

    // Daniel Bersi
    'daniel.bersi@aluno.wyden.edu.br': {
        id: 'student_daniel',
        name: 'Daniel Bersi',
        email: 'daniel.bersi@aluno.wyden.edu.br',
        matricula: '202401067823',
        curso: 'Marketing',
        periodo: '4º Semestre',
        campus: 'São Paulo - Vila Mariana',
        situacao: 'Ativo',
        cr: '9.3',
        cargaHoraria: '1280 / 3.200 horas',
        cpf: '321.654.987-12',
        rg: '32.165.498-7',
        dataNascimento: '05/01/2001',
        telefone: '(11) 94567-8901',
        tipoSanguineo: 'B+',
        numeroCarteirinha: 'WYD2401678230001',
        formaIngresso: 'Transferência Externa',
        turno: 'Noturno',
        type: 'student',
        hasPhoto: true,
        photoPath: 'photos/daniel-bersi.jpg',
        disciplinas: [
            {
                codigo: 'MKT401',
                nome: 'Marketing Digital',
                creditos: 4,
                nota: 9.8,
                situacao: 'Aprovado'
            },
            {
                codigo: 'COM301',
                nome: 'Comunicação Integrada',
                creditos: 4,
                nota: 9.1,
                situacao: 'Aprovado'
            },
            {
                codigo: 'PSI201',
                nome: 'Psicologia do Consumidor',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'EST301',
                nome: 'Pesquisa de Mercado',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'ADM301',
                nome: 'Gestão de Marcas',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            }
        ]
    },

    'eduardo.henrique@aluno.wyden.edu.br': {
        id: 'student_eduardo',
        name: 'Eduardo Henrique',     
        email: 'eduardo.henrique@aluno.wyden.edu.br',
        matricula: '202401056712',
        curso: 'Direito',
        periodo: '5º Semestre',
        campus: 'São Paulo - Vila Mariana',
        situacao: 'Ativo',
        cr: '8.9',
        cargaHoraria: '1600 / 4.000 horas',
        cpf: '474.258.618-28',
        rg: '55.055.463-4',
        dataNascimento: '08/03/2001',
        telefone: '(19) 98971-1055',
        tipoSanguineo: 'AB+',
        numeroCarteirinha: 'WYD2401567120001',
        formaIngresso: 'Vestibular Wyden 2024.1',
        turno: 'Matutino',
        type: 'student',
        hasPhoto: false, // Sem foto ainda
        disciplinas: [
            {
                codigo: 'DIR501',
                nome: 'Direito Constitucional II',
                creditos: 6,
                nota: 9.2,
                situacao: 'Aprovado'
            },
            {
                codigo: 'DIR502',
                nome: 'Direito Penal II',
                creditos: 6,
                nota: 8.7,
                situacao: 'Aprovado'
            },
            {
                codigo: 'DIR503',
                nome: 'Direito Processual Civil I',
                creditos: 6,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'DIR504',
                nome: 'Direito do Trabalho I',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'FIL201',
                nome: 'Filosofia do Direito',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            }
        ]
    },

    // Fábio Henrique
    'fabio.henrique@aluno.wyden.edu.br': {
        id: 'student_fabio',
        name: 'Fábio Henrique de Assis Araújo',
        email: 'fabio.henrique@aluno.wyden.edu.br',
        matricula: '202401045601',
        curso: 'Psicologia',
        periodo: '6º Semestre',
        campus: 'São Paulo - Vila Mariana',
        situacao: 'Ativo',
        cr: '8.8',
        cargaHoraria: '1920 / 4.000 horas',
        cpf: '460.174.168-80',
        rg: '37.671.776-2',
        dataNascimento: '26/12/2000',
        telefone: '(19) 97130-4622',
        tipoSanguineo: 'O-',
        numeroCarteirinha: 'WYD2401456010001',
        formaIngresso: 'ProUni',
        turno: 'Vespertino',
        type: 'student',
        hasPhoto: true,
        photoPath: 'photos/fabio-henrique.jpg',
        disciplinas: [
            {
                codigo: 'PSI601',
                nome: 'Psicologia Clínica II',
                creditos: 6,
                nota: 9.0,
                situacao: 'Aprovado'
            },
            {
                codigo: 'PSI602',
                nome: 'Psicopatologia',
                creditos: 6,
                nota: 8.5,
                situacao: 'Aprovado'
            },
            {
                codigo: 'PSI603',
                nome: 'Psicologia Social',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'PSI604',
                nome: 'Neuropsicologia',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            },
            {
                codigo: 'EST401',
                nome: 'Estatística Aplicada à Psicologia',
                creditos: 4,
                nota: null,
                situacao: 'Em Andamento'
            }
        ]
    },

    // Professor exemplo
    'maria.santos@wyden.edu.br': {
        id: 'teacher_maria',
        name: 'Prof. Maria Santos',
        email: 'maria.santos@wyden.edu.br',
        departamento: 'Departamento de Tecnologia',
        especializacao: 'Sistemas de Informação e Engenharia de Software',
        telefone: '(11) 3333-4444',
        type: 'teacher',
        hasPhoto: true,
        photoPath: 'photos/maria-santos.jpg'
    },

    // Administrador exemplo
    'carlos.admin@wyden.edu.br': {
        id: 'admin_carlos',
        name: 'Carlos Admin',
        email: 'carlos.admin@wyden.edu.br',
        departamento: 'Administração Acadêmica',
        telefone: '(11) 5555-6666',
        type: 'admin',
        hasPhoto: false // Sem foto
    }
};

// Função para buscar usuário por email
function getUserByEmail(email) {
    return USER_MOCKS[email] || null;
}

// Função para autenticar usuário (simulação)
function authenticateUser(email, password) {
    // Para demonstração, qualquer senha serve
    const user = getUserByEmail(email);
    if (user) {
        return user;
    }
    return null;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.USER_MOCKS = USER_MOCKS;
    window.getUserByEmail = getUserByEmail;
    window.authenticateUser = authenticateUser;
} 