const { useState } = React;

// Adicionar paleta de cores moderna
const COLORS = {
    primary: '#E53E3E',      // Vermelho principal
    primaryDark: '#C53030',  // Vermelho escuro
    primaryLight: '#FC8181', // Vermelho claro
    
    // Tons complementares
    secondary: '#2C3E50',    // Azul escuro elegante
    accent: '#E67E22',       // Laranja quente
    accent2: '#8E44AD',      // Roxo profundo
    
    // Tons de suporte
    success: '#27AE60',      // Verde esmeralda
    warning: '#F39C12',      // Âmbar
    danger: '#C0392B',       // Vermelho escuro
    info: '#3498DB',         // Azul céu
    
    // Tons neutros
    light: '#F8F9FA',        // Cinza muito claro
    dark: '#2C3E50',         // Azul escuro
    gray: '#7F8C8D',         // Cinza médio
    grayLight: '#ECF0F1',    // Cinza claro
    
    // Gradientes
    gradientPrimary: 'linear-gradient(135deg, #E53E3E, #C53030)',
    gradientSecondary: 'linear-gradient(135deg, #2C3E50, #34495E)',
    gradientAccent: 'linear-gradient(135deg, #E67E22, #D35400)',
    gradientAccent2: 'linear-gradient(135deg, #8E44AD, #6C3483)'
};

// Substituir os ícones dos cursos por imagens reais e adicionar detalhes para o modal
const courseImages = {
    "Sistemas de Informação": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    "Direito": "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    "Administração": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    "Psicologia": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    "Marketing": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    "Gestão Financeira": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
};

const courseDetails = {
    "Sistemas de Informação": {
        description: "Desenvolva soluções tecnológicas inovadoras e gerencie sistemas complexos.",
        curriculum: [
            "Algoritmos e Programação",
            "Banco de Dados",
            "Engenharia de Software",
            "Redes de Computadores",
            "Inteligência Artificial",
            "Gestão de Projetos"
        ],
        highlights: [
            "Laboratórios modernos",
            "Parcerias com empresas de tecnologia",
            "Projetos práticos desde o 1º semestre"
        ]
    },
    "Direito": {
        description: "Formação jurídica sólida com ética profissional e responsabilidade social.",
        curriculum: [
            "Direito Civil e Penal",
            "Direito Constitucional",
            "Prática Jurídica",
            "Direito Empresarial",
            "Direitos Humanos"
        ],
        highlights: [
            "Simulações de júri",
            "Clínica jurídica própria",
            "Preparação para OAB"
        ]
    },
    "Administração": {
        description: "Forme-se para liderar organizações e tomar decisões estratégicas.",
        curriculum: [
            "Gestão Empresarial",
            "Finanças Corporativas",
            "Marketing Estratégico",
            "Empreendedorismo",
            "Gestão de Pessoas"
        ],
        highlights: [
            "Projetos de consultoria",
            "Laboratórios de negócios",
            "Parcerias com empresas"
        ]
    },
    "Psicologia": {
        description: "Compreenda o comportamento humano e promova bem-estar mental.",
        curriculum: [
            "Psicologia Clínica",
            "Neuropsicologia",
            "Psicologia Social",
            "Psicoterapia",
            "Psicologia Organizacional"
        ],
        highlights: [
            "Clínica escola",
            "Projetos de extensão",
            "Aulas práticas"
        ]
    },
    "Marketing": {
        description: "Domine estratégias de comunicação e construção de marcas impactantes.",
        curriculum: [
            "Marketing Digital",
            "Branding e Design",
            "Mídias Sociais",
            "E-commerce",
            "Pesquisa de Mercado"
        ],
        highlights: [
            "Laboratórios de mídia",
            "Projetos reais com empresas",
            "Eventos de networking"
        ]
    },
    "Gestão Financeira": {
        description: "Especialista em planejamento financeiro e investimentos corporativos.",
        curriculum: [
            "Análise de Investimentos",
            "Controladoria",
            "Mercado de Capitais",
            "Planejamento Tributário",
            "Gestão de Custos"
        ],
        highlights: [
            "Simulações financeiras",
            "Laboratórios de finanças",
            "Parcerias com bancos"
        ]
    }
};

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [userPageEmail, setUserPageEmail] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // Janeiro 2025
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Detectar se é uma página de usuário pela URL
    React.useEffect(() => {
        const path = window.location.pathname;
        if (path.startsWith('/') && path.length > 1) {
            const email = path.substring(1);
            if (email.includes('@')) {
                setUserPageEmail(email);
                setCurrentPage('user-page');
            }
        }
    }, []);

    const showPage = (page) => {
        if (page !== 'user-page') {
            setUserPageEmail(null);
            window.history.pushState({}, '', '/');
        }
        setCurrentPage(page);
        setShowUserDropdown(false); // Fechar dropdown ao navegar
    };

    const handleLogin = (email, password) => {
        // Usar os mocks reais de usuários
        const user = window.authenticateUser ? window.authenticateUser(email, password) : null;
        
        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            
            if (user.type === 'student') {
                setCurrentPage('card');
            } else {
                setCurrentPage('profile');
            }
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCurrentPage('home');
        setShowUserDropdown(false);
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };

    // Fechar dropdown ao clicar fora
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserDropdown]);

    // Adicionar dados mockados de videoaulas
    const videoLessons = [
        {
            id: 1,
            title: "Introdução à Programação Web",
            description: "Fundamentos de HTML, CSS e JavaScript",
            duration: "45:30",
            thumbnail: "https://img.youtube.com/vi/1Rs2ND1luY4/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/1Rs2ND1luY4",
            category: "Desenvolvimento Web",
            instructor: "Prof. Maria Santos",
            date: "2025-03-15"
        },
        {
            id: 2,
            title: "Banco de Dados Relacional",
            description: "Conceitos fundamentais de SQL e modelagem de dados",
            duration: "52:15",
            thumbnail: "https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
            category: "Banco de Dados",
            instructor: "Prof. Carlos Silva",
            date: "2025-03-14"
        },
        {
            id: 3,
            title: "React.js Avançado",
            description: "Hooks, Context API e gerenciamento de estado",
            duration: "38:45",
            thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
            category: "Desenvolvimento Web",
            instructor: "Prof. João Oliveira",
            date: "2025-03-13"
        },
        {
            id: 4,
            title: "Cloud Computing",
            description: "AWS, Azure e Google Cloud Platform",
            duration: "41:20",
            thumbnail: "https://img.youtube.com/vi/3hLmDS179YE/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/embed/3hLmDS179YE",
            category: "Cloud",
            instructor: "Prof. Ana Costa",
            date: "2025-03-12"
        }
    ];

    // Adicionar dados mockados de eventos acadêmicos
    const academicEvents = [
        {
            id: 1,
            title: "Prova de Programação Web",
            type: "exam",
            date: "2025-03-25",
            time: "19:00",
            duration: "120",
            location: "Sala 302",
            discipline: "Programação Web",
            professor: "Prof. Maria Santos",
            description: "Prova prática de HTML, CSS e JavaScript"
        },
        {
            id: 2,
            title: "Entrega do TCC",
            type: "assignment",
            date: "2025-04-15",
            time: "23:59",
            duration: "0",
            location: "Portal Acadêmico",
            discipline: "Trabalho de Conclusão de Curso",
            professor: "Prof. Carlos Silva",
            description: "Entrega final do TCC com apresentação"
        },
        {
            id: 3,
            title: "Workshop de React",
            type: "workshop",
            date: "2025-03-28",
            time: "14:00",
            duration: "180",
            location: "Laboratório 5",
            discipline: "Desenvolvimento Web",
            professor: "Prof. João Oliveira",
            description: "Workshop prático de React.js e Hooks"
        },
        {
            id: 4,
            title: "Reunião de Estágio",
            type: "meeting",
            date: "2025-04-02",
            time: "15:00",
            duration: "60",
            location: "Sala de Reuniões",
            discipline: "Estágio Supervisionado",
            professor: "Prof. Ana Costa",
            description: "Apresentação do relatório de estágio"
        },
        {
            id: 5,
            title: "Prova de Banco de Dados",
            type: "exam",
            date: "2025-04-05",
            time: "19:00",
            duration: "120",
            location: "Sala 205",
            discipline: "Banco de Dados",
            professor: "Prof. Carlos Silva",
            description: "Prova teórica e prática de SQL"
        }
    ];

    const WydenLogo = ({ size = "40px", fontSize = "auto" }) => {
        // Calcular font-size automaticamente baseado no tamanho se não especificado
        const autoFontSize = fontSize === "auto" ? `${parseInt(size) * 0.3}px` : fontSize;
        
        return (
            <div className="wyden-logo" style={{
                width: size,
                height: size,
                background: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                color: '#E53E3E',
                fontSize: autoFontSize,
                textAlign: 'center',
                lineHeight: '1',
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                letterSpacing: '-0.5px',
                userSelect: 'none'
            }}>
                wyden
            </div>
        );
    };

    return (
        <div style={{backgroundColor: COLORS.light}}>
            <nav className="navbar navbar-expand-lg sticky-top" 
                 style={{
                     background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                 }}>
                <div className="container">
                    <a className="navbar-brand text-white d-flex align-items-center gap-2" 
                       href="#" onClick={() => showPage('home')}>
                        <WydenLogo />
                        <strong>Faculdade Wyden</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
                            {!isLoggedIn || !currentUser ? (
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#" onClick={() => showPage('home')}>Início</a>
                                </li>
                            ) : null}
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" onClick={() => showPage('lessons')}>Aulas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" onClick={() => showPage('calendar')}>Calendário</a>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#" onClick={() => showPage('courses')}>Cursos</a>
                                </li>
                            )}
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" onClick={() => showPage('news')}>Notícias</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" onClick={() => showPage('contact')}>Contato</a>
                            </li>
                            {!isLoggedIn ? (
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#" onClick={() => showPage('login')}>
                                        <i className="fas fa-sign-in-alt"></i> Portal
                                    </a>
                                </li>
                            ) : (
                                <li className="nav-item user-dropdown-container position-relative">
                                    <button 
                                        className="btn text-white text-decoration-none d-flex align-items-center gap-1" 
                                        onClick={toggleUserDropdown}
                                        style={{border: 'none', background: 'none', padding: '0.5rem'}}
                                    >
                                        <i className="fas fa-user"></i> {currentUser?.name.split(' ')[0]}
                                        <i className={`fas fa-chevron-${showUserDropdown ? 'up' : 'down'} ms-1`}></i>
                                    </button>
                                    {showUserDropdown && (
                                        <div className="position-absolute bg-white rounded shadow" 
                                             style={{
                                                 top: '100%', 
                                                 right: '0', 
                                                 minWidth: '200px', 
                                                 zIndex: 1050,
                                                 border: '1px solid #dee2e6'
                                             }}>
                                            <div className="py-1">
                                                <button 
                                                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" 
                                                    onClick={() => showPage('profile')}
                                                    style={{border: 'none', background: 'none', width: '100%', textAlign: 'left'}}
                                                >
                                                    <i className="fas fa-chart-bar text-primary"></i> Meus Dados
                                                </button>
                                                <button 
                                                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" 
                                                    onClick={() => showPage('card')}
                                                    style={{border: 'none', background: 'none', width: '100%', textAlign: 'left'}}
                                                >
                                                    <i className="fas fa-id-card text-primary"></i> Carteirinha
                                                </button>
                                                <hr className="dropdown-divider my-1" />
                                                <button 
                                                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2" 
                                                    onClick={logout}
                                                    style={{border: 'none', background: 'none', width: '100%', textAlign: 'left'}}
                                                >
                                                    <i className="fas fa-sign-out-alt text-danger"></i> Sair
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Remover a seção de videoaulas da home */}
            {currentPage === 'home' && (!isLoggedIn || !currentUser) && (
                <div>
                    <section className="hero-section text-white text-center py-5" 
                             style={{background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.9), rgba(197, 48, 48, 0.9))'}}>
                        <div className="container">
                            <h1 className="display-4 mb-4">Bem-vindo à Wyden</h1>
                            <p className="lead mb-5">Excelência em educação superior. Construindo o futuro através do conhecimento e inovação tecnológica.</p>
                            <div>
                                <button className="btn btn-light btn-lg me-3">
                                    <i className="fas fa-play"></i> Começar Agora
                                </button>
                                <button className="btn btn-outline-light btn-lg">
                                    <i className="fas fa-info-circle"></i> Saiba Mais
                                </button>
                            </div>
                        </div>
                    </section>
                    <section className="py-5 text-white" 
                             style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-md-3">
                                    <h2 className="display-4">15,000+</h2>
                                    <p className="lead">Estudantes</p>
                                </div>
                                <div className="col-md-3">
                                    <h2 className="display-4">80+</h2>
                                    <p className="lead">Cursos</p>
                                </div>
                                <div className="col-md-3">
                                    <h2 className="display-4">800+</h2>
                                    <p className="lead">Professores</p>
                                </div>
                                <div className="col-md-3">
                                    <h2 className="display-4">25+</h2>
                                    <p className="lead">Anos de História</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="py-5">
                        <div className="container">
                            <h2 className="text-center mb-5">Nossos Serviços</h2>
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 text-center service-card">
                                        <div className="card-body">
                                            <i className="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                                            <h5 className="card-title">Ensino de Qualidade</h5>
                                            <p className="card-text">Professores especializados e infraestrutura moderna para proporcionar a melhor experiência educacional.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 text-center service-card">
                                        <div className="card-body">
                                            <i className="fas fa-laptop-code fa-3x text-primary mb-3"></i>
                                            <h5 className="card-title">Tecnologia & Inovação</h5>
                                            <p className="card-text">Cursos voltados para o mercado de trabalho com foco em tecnologia e inovação.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 text-center service-card">
                                        <div className="card-body">
                                            <i className="fas fa-users fa-3x text-primary mb-3"></i>
                                            <h5 className="card-title">Conectividade</h5>
                                            <p className="card-text">Programas que conectam estudantes ao mercado de trabalho e oportunidades profissionais.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Página de Cursos */}
            {currentPage === 'courses' && (
                <div>
                    <section className="py-5 text-white" style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                        <div className="container">
                            <div className="text-center">
                                <h1 className="display-4 mb-4">Nossos Cursos</h1>
                                <p className="lead mb-0">Descubra o curso ideal para sua carreira e futuro profissional</p>
                            </div>
                        </div>
                    </section>
                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                {Object.keys(courseImages).map((course, idx) => (
                                    <div className="col-md-4 mb-4" key={course}>
                                        <div className="card h-100 course-card hover-shadow" style={{cursor: 'pointer'}} onClick={() => setSelectedCourse(course)}>
                                            <img src={courseImages[course]} className="card-img-top" alt={course} style={{height: '180px', objectFit: 'cover'}} />
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">{course}</h5>
                                                <p className="card-text">{courseDetails[course].description}</p>
                                                <ul className="list-unstyled mb-2">
                                                    {courseDetails[course].highlights.map((h, i) => (
                                                        <li key={i}><i className="fas fa-check text-success me-2"></i>{h}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* Modal de detalhes do curso */}
                    {selectedCourse && (
                        <div className="modal fade show" style={{display: 'block', background: 'rgba(0,0,0,0.5)'}} tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{selectedCourse}</h5>
                                        <button type="button" className="btn-close" onClick={() => setSelectedCourse(null)}></button>
                                    </div>
                                    <div className="modal-body row">
                                        <div className="col-md-5 mb-3 mb-md-0">
                                            <img src={courseImages[selectedCourse]} alt={selectedCourse} className="img-fluid rounded" />
                                        </div>
                                        <div className="col-md-7">
                                            <h6 className="mb-2">Sobre o curso</h6>
                                            <p>{courseDetails[selectedCourse].description}</p>
                                            <h6 className="mt-4 mb-2">Grade Curricular (resumida)</h6>
                                            <ul>
                                                {courseDetails[selectedCourse].curriculum.map((item, i) => (
                                                    <li key={i}><i className="fas fa-book-open text-primary me-2"></i>{item}</li>
                                                ))}
                                            </ul>
                                            <div className="mt-4">
                                                <button className="btn btn-primary me-2" onClick={() => alert('Em breve!')}>Quero este curso</button>
                                                <button className="btn btn-outline-secondary" onClick={() => setSelectedCourse(null)}>Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Página de Login */}
            {currentPage === 'login' && (
                <section className="py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h3 className="text-center mb-4">
                                            <i className="fas fa-user-circle"></i> Portal de Acesso
                                        </h3>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const email = e.target.email.value;
                                            const password = e.target.password.value;
                                            const success = handleLogin(email, password);
                                            
                                            if (!success) {
                                                alert('Usuário não encontrado!');
                                            }
                                        }}>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    className="form-control" 
                                                    placeholder="seu@email.com" 
                                                    required 
                                                />
                                                <div className="form-text">
                                                    O email segue o formato: nome.sobrenome@aluno.wyden.edu.br
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Senha</label>
                                                <input 
                                                    type="password" 
                                                    name="password"
                                                    className="form-control" 
                                                    placeholder="Sua senha" 
                                                    required 
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100">
                                                <i className="fas fa-unlock"></i> Entrar
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Página de Dados do Usuário */}
            {currentPage === 'profile' && currentUser && (
                <div>
                    <section className="py-5 text-white" style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                        <div className="container">
                            <div className="text-center">
                                <div className="profile-photo mb-4">
                                    {currentUser?.hasPhoto && currentUser?.photoPath ? (
                                        <img src={currentUser.photoPath} alt={currentUser.name} 
                                             onError={(e) => {
                                                 e.target.style.display = 'none';
                                                 e.target.nextSibling.style.display = 'flex';
                                             }} />
                                    ) : null}
                                    <i className={`fas fa-user-circle ${currentUser?.hasPhoto && currentUser?.photoPath ? 'd-none' : ''}`}></i>
                                </div>
                                <div style={{marginTop: '1rem'}}>
                                    <h1 className="mb-3">{currentUser.name}</h1>
                                    <p className="lead mb-2">{currentUser.curso}</p>
                                    <p className="mb-0" style={{fontSize: '0.9rem', opacity: '0.8'}}>
                                        Matrícula: {currentUser.matricula} | {currentUser.periodo}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title border-bottom border-primary pb-2 mb-4">
                                                <i className="fas fa-clipboard me-2"></i> Dados Pessoais
                                            </h5>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Nome Completo:</strong></div>
                                                <div className="col-sm-7">{currentUser.name}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Data de Nascimento:</strong></div>
                                                <div className="col-sm-7">{currentUser.dataNascimento}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Email Institucional:</strong></div>
                                                <div className="col-sm-7">{currentUser.email}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-5"><strong>Telefone:</strong></div>
                                                <div className="col-sm-7">{currentUser.telefone}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title border-bottom border-primary pb-2 mb-4">
                                                <i className="fas fa-graduation-cap me-2"></i> Dados Acadêmicos
                                            </h5>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Matrícula:</strong></div>
                                                <div className="col-sm-7">{currentUser.matricula}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Curso:</strong></div>
                                                <div className="col-sm-7">{currentUser.curso}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Período Atual:</strong></div>
                                                <div className="col-sm-7">{currentUser.periodo}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>Situação:</strong></div>
                                                <div className="col-sm-7">
                                                    <span className="badge bg-success">{currentUser.situacao}</span>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-5"><strong>CR (Coeficiente):</strong></div>
                                                <div className="col-sm-7">{currentUser.cr}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-5"><strong>Carga Horária:</strong></div>
                                                <div className="col-sm-7">{currentUser.cargaHoraria}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {currentUser.disciplinas && (
                                    <div className="col-12 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title border-bottom border-primary pb-2 mb-4">
                                                    <i className="fas fa-book me-2"></i> Disciplinas do Semestre Atual (2024.2)
                                                </h5>
                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Código</th>
                                                                <th>Disciplina</th>
                                                                <th>Créditos</th>
                                                                <th>Nota</th>
                                                                <th>Situação</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {currentUser.disciplinas.map((disciplina, index) => (
                                                                <tr key={index}>
                                                                    <td>{disciplina.codigo}</td>
                                                                    <td>{disciplina.nome}</td>
                                                                    <td>{disciplina.creditos}</td>
                                                                    <td>{disciplina.nota || '-'}</td>
                                                                    <td>
                                                                        <span className={`badge ${disciplina.situacao === 'Aprovado' ? 'bg-success' : 'bg-warning'}`}>
                                                                            {disciplina.situacao}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Carteirinha Virtual */}
            {currentPage === 'card' && currentUser && (
                <section className="py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">
                            <i className="fas fa-id-card"></i> Carteirinha Virtual
                        </h2>
                        
                        <div className="cards-display">
                            <div className="student-card">
                                <div className="card-header">
                                    <div className="university-logo">
                                        <WydenLogo size="35px" />
                                        <div>
                                            <div className="university-name">FACULDADE WYDEN</div>
                                            <div className="card-title">CARTEIRA DE IDENTIFICAÇÃO ESTUDANTIL</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card-body">
                                    <div className="student-photo">
                                        {currentUser?.hasPhoto && currentUser?.photoPath ? (
                                            <img src={currentUser.photoPath} alt={currentUser.name} 
                                                 onError={(e) => {
                                                     e.target.style.display = 'none';
                                                     e.target.nextSibling.style.display = 'flex';
                                                 }} />
                                        ) : null}
                                        <i className={`fas fa-user ${currentUser?.hasPhoto && currentUser?.photoPath ? 'd-none' : ''}`}></i>
                                    </div>
                                    <div className="student-info">
                                        <h6>{currentUser.name}</h6>
                                        <div className="student-details">
                                            <div><strong>Matrícula:</strong> {currentUser.matricula}</div>
                                            <div><strong>Curso:</strong> {currentUser.curso}</div>
                                            <div><strong>Período:</strong> {currentUser.periodo}</div>
                                            <div><strong>Campus:</strong> {currentUser.campus}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="student-card-back">
                                <div className="card-header">
                                    <div className="card-number">
                                        <strong>Nº:</strong> {currentUser.numeroCarteirinha}
                                    </div>
                                </div>
                                
                                <div className="qr-code">
                                    {currentUser.email === "hugo.bersi@aluno.wyden.edu.br" ? (
                                        <img src="/photos/hugo-qrcode.png" alt="QR Code" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : currentUser.email === "gustavo.honorato@aluno.wyden.edu.br" ? (
                                        <img src="/photos/gustavo-qrcode.png" alt="QR Code" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : currentUser.email === "mauricio.pires@aluno.wyden.edu.br" ? (
                                        <img src="/photos/mauricio-qrcode.png" alt="QR Code" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : currentUser.email === "fabio.henrique@aluno.wyden.edu.br" ? (
                                        <img src="/photos/fabio-qrcode.png" alt="QR Code" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : currentUser.email === "guilherme.batista@aluno.wyden.edu.br" ? (
                                        <img src="/photos/guilherme-qrcode.png" alt="QR Code" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : currentUser.email === "eduardo.henrique@aluno.wyden.edu.br" ? (
                                        <img src="/photos/eduardo-qrcode.png" alt="QR Code" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <a href={`/${currentUser.email}`} target="_blank" style={{ color: "var(--primary-color)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }} title="Clique para acessar informações públicas">
                                            QR<br />CODE
                                        </a>
                                    )}
                                    <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", color: "var(--primary-color)", fontSize: "0.65rem", fontWeight: "bold", textAlign: "center" }}> QR<br />CODE </div>
                                </div>
                                
                                <div className="emergency-info">
                                    <p><strong>Emergência:</strong> {currentUser.telefone}</p>
                                    <p><strong>Válida até:</strong> 12/2028</p>
                                </div>

                                <div className="observations">
                                    <p><strong>OBSERVAÇÕES:</strong> Esta carteira é válida apenas com documento oficial de identidade. Em caso de perda, comunicar imediatamente à secretaria acadêmica.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center mt-5">
                            <p className="text-muted mb-4">
                                <i className="fas fa-lightbulb"></i> <strong>Dica:</strong> Salve esta página nos favoritos ou tire uma captura de tela para usar offline!
                            </p>
                            <button className="btn btn-primary btn-lg" onClick={() => window.print()}>
                                <i className="fas fa-print"></i> Imprimir Carteirinha
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Página de Notícias */}
            {currentPage === 'news' && (
                <div>
                    <section className="py-5 text-white" style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                        <div className="container">
                            <div className="text-center">
                                <h1 className="display-4 mb-4">Notícias</h1>
                                <p className="lead mb-0">Fique por dentro das últimas novidades da Wyden</p>
                            </div>
                        </div>
                    </section>

                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="news-item">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-primary">Destaque</span>
                                            <small className="text-muted">15 de Novembro, 2025</small>
                                        </div>
                                        <h3>Wyden inaugura novo laboratório de Inteligência Artificial</h3>
                                        <p>A Faculdade Wyden acaba de inaugurar seu mais novo laboratório, equipado com as tecnologias mais avançadas em IA e Machine Learning. O espaço conta com 40 estações de trabalho, GPUs de última geração e parcerias com empresas do Vale do Silício.</p>
                                        <div className="d-flex align-items-center">
                                            <img src="https://via.placeholder.com/40" alt="Autor" className="rounded-circle me-2" />
                                            <div>
                                                <small className="fw-bold">Prof. Maria Santos</small>
                                                <br />
                                                <small className="text-muted">Coordenadora de Tecnologia</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="news-item">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-success">Acadêmico</span>
                                            <small className="text-muted">10 de Novembro, 2024</small>
                                        </div>
                                        <h4>Estudantes da Wyden conquistam primeiro lugar em hackathon nacional</h4>
                                        <p>Equipe formada por alunos dos cursos de Sistemas de Informação e Marketing desenvolveu aplicativo inovador para gestão sustentável de resíduos urbanos, conquistando R$ 50.000 em premiação.</p>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-trophy text-warning me-2"></i>1º Lugar Nacional</li>
                                                    <li><i className="fas fa-users text-primary me-2"></i>5 estudantes participantes</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-dollar-sign text-success me-2"></i>R$ 50.000 em prêmios</li>
                                                    <li><i className="fas fa-building text-info me-2"></i>Mentoria com startups</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="news-item">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-info">Parcerias</span>
                                            <small className="text-muted">5 de Novembro, 2024</small>
                                        </div>
                                        <h4>Nova parceria com Microsoft oferece certificações gratuitas</h4>
                                        <p>Estudantes da Wyden agora têm acesso gratuito às certificações Microsoft Azure, Power Platform e Microsoft 365, aumentando suas chances no mercado de trabalho.</p>
                                        <div className="alert alert-info">
                                            <i className="fas fa-info-circle me-2"></i>
                                            <strong>Inscrições abertas!</strong> Procure a coordenação do seu curso para mais informações.
                                        </div>
                                    </div>

                                    <div className="news-item">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-warning">Eventos</span>
                                            <small className="text-muted">1 de Novembro, 2024</small>
                                        </div>
                                        <h4>Semana de Tecnologia e Inovação 2024</h4>
                                        <p>De 25 a 29 de novembro acontece a maior semana acadêmica da Wyden, com palestras, workshops e feira de carreiras. Mais de 50 empresas confirmadas!</p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Programação:</h6>
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-calendar me-2"></i>25/11 - Abertura e Keynote</li>
                                                    <li><i className="fas fa-calendar me-2"></i>26/11 - Workshops técnicos</li>
                                                    <li><i className="fas fa-calendar me-2"></i>27/11 - Feira de carreiras</li>
                                                    <li><i className="fas fa-calendar me-2"></i>28/11 - Hackathon interno</li>
                                                    <li><i className="fas fa-calendar me-2"></i>29/11 - Premiação e encerramento</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <h6>Empresas participantes:</h6>
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-building me-2"></i>Google</li>
                                                    <li><i className="fas fa-building me-2"></i>Microsoft</li>
                                                    <li><i className="fas fa-building me-2"></i>IBM</li>
                                                    <li><i className="fas fa-building me-2"></i>Nubank</li>
                                                    <li><i className="fas fa-building me-2"></i>+ 46 outras empresas</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card mb-4">
                                        <div className="card-header bg-primary text-white">
                                            <h6 className="mb-0"><i className="fas fa-bolt me-2"></i>Últimas Atualizações</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex mb-3">
                                                <i className="fas fa-circle text-primary me-2" style={{fontSize: '8px', marginTop: '8px'}}></i>
                                                <div>
                                                    <small className="fw-bold">Biblioteca 24h</small><br />
                                                    <small className="text-muted">Acesso liberado para período de provas</small>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <i className="fas fa-circle text-success me-2" style={{fontSize: '8px', marginTop: '8px'}}></i>
                                                <div>
                                                    <small className="fw-bold">Novo sistema acadêmico</small><br />
                                                    <small className="text-muted">Portal atualizado com nova interface</small>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <i className="fas fa-circle text-warning me-2" style={{fontSize: '8px', marginTop: '8px'}}></i>
                                                <div>
                                                    <small className="fw-bold">Estacionamento ampliado</small><br />
                                                    <small className="text-muted">+200 vagas disponíveis</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-4">
                                        <div className="card-header bg-secondary text-white">
                                            <h6 className="mb-0"><i className="fas fa-calendar me-2"></i>Próximos Eventos</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <div className="fw-bold text-primary">18 Nov 2025</div>
                                                <small>Palestra: "Futuro do Trabalho"</small>
                                                <br /><small className="text-muted">19h - Auditório Principal</small>
                                            </div>
                                            <div className="mb-3">
                                                <div className="fw-bold text-primary">22 Nov</div>
                                                <small>Workshop: React & Node.js</small>
                                                <br /><small className="text-muted">14h - Lab de Informática</small>
                                            </div>
                                            <div className="mb-3">
                                                <div className="fw-bold text-primary">25 Nov</div>
                                                <small>Semana de Tecnologia (início)</small>
                                                <br /><small className="text-muted">8h - Campus completo</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header bg-success text-white">
                                            <h6 className="mb-0"><i className="fas fa-graduation-cap me-2"></i>Destaques Acadêmicos</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <h3 className="text-success">92%</h3>
                                                <small>Taxa de empregabilidade</small>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <h3 className="text-primary">4.8/5</h3>
                                                <small>Avaliação dos alunos</small>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <h3 className="text-warning">15+</h3>
                                                <small>Prêmios acadêmicos em 2024</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Página de Contato */}
            {currentPage === 'contact' && (
                <div>
                    <section className="py-5 text-white" style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                        <div className="container">
                            <div className="text-center">
                                <h1 className="display-4 mb-4">Contato</h1>
                                <p className="lead mb-0">Entre em contato conosco. Estamos aqui para ajudar!</p>
                            </div>
                        </div>
                    </section>

                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="mb-0"><i className="fas fa-envelope me-2"></i>Envie sua mensagem</h5>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Nome Completo</label>
                                                        <input type="text" className="form-control" placeholder="Seu nome" required />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" className="form-control" placeholder="seu@email.com" required />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Telefone</label>
                                                        <input type="tel" className="form-control" placeholder="(11) 99999-9999" />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label">Assunto</label>
                                                        <select className="form-select" required>
                                                            <option value="">Selecione um assunto</option>
                                                            <option value="informacoes">Informações sobre cursos</option>
                                                            <option value="matricula">Processo de matrícula</option>
                                                            <option value="financeiro">Questões financeiras</option>
                                                            <option value="academico">Suporte acadêmico</option>
                                                            <option value="estagio">Estágios e carreiras</option>
                                                            <option value="outro">Outros</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Mensagem</label>
                                                    <textarea className="form-control" rows="5" placeholder="Escreva sua mensagem aqui..." required></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="fas fa-paper-plane me-2"></i>Enviar Mensagem
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <h4 className="mb-4">Localização</h4>
                                            <div className="ratio ratio-16x9">
                                                <iframe 
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1985834254774!2d-46.63881268502204!3d-23.562208984685655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt!2sbr!4v1635959635942!5m2!1spt!2sbr" 
                                                    style={{border: 0}} 
                                                    allowFullScreen 
                                                    loading="lazy"
                                                    title="Localização da Wyden">
                                                </iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card mb-4">
                                        <div className="card-header bg-primary text-white">
                                            <h6 className="mb-0"><i className="fas fa-map-marker-alt me-2"></i>Campus Principal</h6>
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Endereço:</strong><br />
                                            Rua da Wyden, 1234<br />
                                            Vila Mariana - São Paulo/SP<br />
                                            CEP: 04038-001</p>
                                            
                                            <p><strong>Horário de Funcionamento:</strong><br />
                                            Segunda a Sexta: 7h às 23h<br />
                                            Sábado: 8h às 18h<br />
                                            Domingo: Fechado</p>
                                        </div>
                                    </div>

                                    <div className="card mb-4">
                                        <div className="card-header bg-success text-white">
                                            <h6 className="mb-0"><i className="fas fa-phone me-2"></i>Contatos Diretos</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <strong>Central de Atendimento</strong><br />
                                                <i className="fas fa-phone text-success me-2"></i>(11) 3456-7890<br />
                                                <i className="fas fa-envelope text-success me-2"></i>contato@wyden.edu.br
                                            </div>
                                            
                                            <div className="mb-3">
                                                <strong>Secretaria Acadêmica</strong><br />
                                                <i className="fas fa-phone text-primary me-2"></i>(11) 3456-7891<br />
                                                <i className="fas fa-envelope text-primary me-2"></i>secretaria@wyden.edu.br
                                            </div>
                                            
                                            <div className="mb-3">
                                                <strong>Financeiro</strong><br />
                                                <i className="fas fa-phone text-warning me-2"></i>(11) 3456-7892<br />
                                                <i className="fas fa-envelope text-warning me-2"></i>financeiro@wyden.edu.br
                                            </div>
                                            
                                            <div className="mb-3">
                                                <strong>WhatsApp</strong><br />
                                                <i className="fab fa-whatsapp text-success me-2"></i>(11) 99999-8888
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-4">
                                        <div className="card-header bg-info text-white">
                                            <h6 className="mb-0"><i className="fas fa-share-alt me-2"></i>Redes Sociais</h6>
                                        </div>
                                        <div className="card-body text-center">
                                            <div className="row">
                                                <div className="col-3">
                                                    <a href="#" className="text-primary">
                                                        <i className="fab fa-facebook fa-2x"></i>
                                                    </a>
                                                </div>
                                                <div className="col-3">
                                                    <a href="#" className="text-info">
                                                        <i className="fab fa-instagram fa-2x"></i>
                                                    </a>
                                                </div>
                                                <div className="col-3">
                                                    <a href="#" className="text-primary">
                                                        <i className="fab fa-linkedin fa-2x"></i>
                                                    </a>
                                                </div>
                                                <div className="col-3">
                                                    <a href="#" className="text-danger">
                                                        <i className="fab fa-youtube fa-2x"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <small className="text-muted">@FaculdadeWyden</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header bg-warning text-dark">
                                            <h6 className="mb-0"><i className="fas fa-clock me-2"></i>Atendimento Rápido</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <strong>Ouvidoria:</strong><br />
                                                <small>Para elogios, sugestões ou reclamações</small><br />
                                                <i className="fas fa-envelope text-warning me-2"></i>ouvidoria@wyden.edu.br
                                            </div>
                                            
                                            <div className="mb-3">
                                                <strong>Suporte Técnico:</strong><br />
                                                <small>Problemas com portal ou sistemas</small><br />
                                                <i className="fas fa-envelope text-info me-2"></i>suporte@wyden.edu.br
                                            </div>
                                            
                                            <div className="alert alert-warning">
                                                <i className="fas fa-info-circle me-2"></i>
                                                <strong>Dica:</strong> Para atendimento mais rápido, tenha em mãos seu número de matrícula.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Página de Usuário via QR Code */}
            {currentPage === 'user-page' && userPageEmail && (
                <div>
                    {(() => {
                        // Buscar usuário pelo email na URL
                        const user = window.getUserByEmail ? window.getUserByEmail(userPageEmail) : null;
                        
                        if (!user) {
                            return (
                                <section className="py-5">
                                    <div className="container text-center">
                                        <div className="card mx-auto" style={{maxWidth: '500px'}}>
                                            <div className="card-body">
                                                <i className="fas fa-user-slash fa-3x text-muted mb-3"></i>
                                                <h3>Usuário não encontrado</h3>
                                                <p className="text-muted">O email <strong>{userPageEmail}</strong> não foi encontrado em nossa base de dados.</p>
                                                <button className="btn btn-primary" onClick={() => showPage('home')}>
                                                    <i className="fas fa-home me-2"></i>Voltar ao Início
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        }

                        return (
                            <div>
                                <section className="py-5 text-white" style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                                    <div className="container">
                                        <div className="text-center">
                                            <div className="profile-photo mb-4">
                                                {user?.hasPhoto && user?.photoPath ? (
                                                    <img src={user.photoPath} alt={user.name} 
                                                         onError={(e) => {
                                                             e.target.style.display = 'none';
                                                             e.target.nextSibling.style.display = 'flex';
                                                         }} />
                                                ) : null}
                                                <i className={`fas fa-user-circle ${user?.hasPhoto && user?.photoPath ? 'd-none' : ''}`}></i>
                                            </div>
                                            <div style={{marginTop: '1rem'}}>
                                                <h1 className="mb-3">{user.name}</h1>
                                                <p className="lead mb-2">{user.curso}</p>
                                                <p className="mb-0" style={{fontSize: '0.9rem', opacity: '0.8'}}>
                                                    {user.matricula} | {user.periodo}
                                                </p>
                                                <p className="mb-0" style={{fontSize: '0.8rem', opacity: '0.7'}}>
                                                    <i className="fas fa-qrcode me-2"></i>Acesso via QR Code
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="py-5">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-md-8">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title border-bottom border-primary pb-2 mb-4">
                                                            <i className="fas fa-id-card me-2"></i> Informações do Estudante
                                                        </h5>
                                                        
                                                        <div className="row">
                                                            <div className="col-md-6 mb-4">
                                                                <h6 className="text-primary mb-3">
                                                                    <i className="fas fa-user me-2"></i>Dados Pessoais
                                                                </h6>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Nome Completo:</small><br />
                                                                    <strong>{user.name}</strong>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Email:</small><br />
                                                                    <strong>{user.email}</strong>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Telefone:</small><br />
                                                                    <strong>{user.telefone}</strong>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Campus:</small><br />
                                                                    <strong>{user.campus}</strong>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-md-6 mb-4">
                                                                <h6 className="text-primary mb-3">
                                                                    <i className="fas fa-graduation-cap me-2"></i>Dados Acadêmicos
                                                                </h6>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Matrícula:</small><br />
                                                                    <strong>{user.matricula}</strong>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Curso:</small><br />
                                                                    <strong>{user.curso}</strong>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Período:</small><br />
                                                                    <strong>{user.periodo}</strong>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <small className="text-muted">Situação:</small><br />
                                                                    <span className="badge bg-success">{user.situacao}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <h6 className="text-primary mb-3">
                                                                    <i className="fas fa-shield-alt me-2"></i>Informações de Emergência
                                                                </h6>
                                                                <div className="row">
                                                                    <div className="col-md-4 mb-2">
                                                                        <small className="text-muted">Tipo Sanguíneo:</small><br />
                                                                        <strong>{user.tipoSanguineo}</strong>
                                                                    </div>
                                                                    <div className="col-md-4 mb-2">
                                                                        <small className="text-muted">Carteirinha:</small><br />
                                                                        <strong>{user.numeroCarteirinha}</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="alert alert-info mt-4">
                                                            <i className="fas fa-info-circle me-2"></i>
                                                            <strong>Página de Verificação:</strong> Esta página contém informações básicas do estudante para fins de identificação e verificação acadêmica.
                                                        </div>
                                                        
                                                        <div className="text-center mt-4">
                                                            <button className="btn btn-primary me-3" onClick={() => showPage('home')}>
                                                                <i className="fas fa-home me-2"></i>Portal Wyden
                                                            </button>
                                                            <button className="btn btn-outline-primary" onClick={() => window.location.href = `mailto:${user.email}`}>
                                                                <i className="fas fa-envelope me-2"></i>Contatar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* Remover a seção de videoaulas da home */}
            {currentPage === 'lessons' && isLoggedIn && (
                <div>
                    <section className="py-5 text-white" style={{background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`}}>
                        <div className="container">
                            <div className="text-center">
                                <h1 className="display-4 mb-4">Aulas Online</h1>
                                <p className="lead mb-0">Acesse suas videoaulas e materiais de estudo</p>
                            </div>
                        </div>
                    </section>

                    <section className="py-5" style={{backgroundColor: COLORS.light}}>
                        <div className="container">
                            <div className="row mb-4">
                                <div className="col-md-8">
                                    <div className="input-group">
                                        <span className="input-group-text" style={{backgroundColor: 'white'}}>
                                            <i className="fas fa-search"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Buscar aulas..." 
                                            style={{borderLeft: 'none'}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option value="">Todas as categorias</option>
                                        <option value="web">Desenvolvimento Web</option>
                                        <option value="database">Banco de Dados</option>
                                        <option value="cloud">Cloud Computing</option>
                                    </select>
                                </div>
                            </div>

                            {selectedVideo ? (
                                <div className="row">
                                    <div className="col-lg-8 mx-auto">
                                        <div className="card shadow-sm">
                                            <div className="card-body p-0">
                                                <div className="ratio ratio-16x9">
                                                    <iframe 
                                                        src={selectedVideo.videoUrl} 
                                                        title={selectedVideo.title}
                                                        allowFullScreen
                                                        style={{border: 'none'}}
                                                    ></iframe>
                                                </div>
                                                <div className="p-4">
                                                    <h4 style={{color: COLORS.secondary}}>{selectedVideo.title}</h4>
                                                    <div className="d-flex gap-3 mb-3">
                                                        <span className="badge" style={{backgroundColor: COLORS.accent}}>
                                                            <i className="fas fa-clock me-1"></i>{selectedVideo.duration}
                                                        </span>
                                                        <span className="badge" style={{backgroundColor: COLORS.primary}}>
                                                            {selectedVideo.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted">{selectedVideo.description}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <small className="text-muted">
                                                            <i className="fas fa-user me-1"></i>{selectedVideo.instructor}
                                                        </small>
                                                        <button 
                                                            className="btn btn-sm" 
                                                            style={{backgroundColor: COLORS.grayLight}}
                                                            onClick={() => setSelectedVideo(null)}
                                                        >
                                                            <i className="fas fa-times me-1"></i>Fechar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="row g-4 mb-4">
                                        {videoLessons.map(lesson => (
                                            <div key={lesson.id} className="col-md-6 col-lg-3">
                                                <div className="card h-100 shadow-sm hover-shadow" 
                                                     style={{
                                                         transition: 'transform 0.2s, box-shadow 0.2s',
                                                         cursor: 'pointer'
                                                     }}
                                                     onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                     onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                                     onClick={() => setSelectedVideo(lesson)}>
                                                    <div className="position-relative">
                                                        <img 
                                                            src={lesson.thumbnail} 
                                                            className="card-img-top" 
                                                            alt={lesson.title}
                                                            style={{height: '160px', objectFit: 'cover'}}
                                                        />
                                                        <div className="position-absolute bottom-0 end-0 m-2">
                                                            <span className="badge" style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
                                                                <i className="fas fa-clock me-1"></i>{lesson.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <span className="badge mb-2" style={{backgroundColor: COLORS.primary}}>
                                                            {lesson.category}
                                                        </span>
                                                        <h5 className="card-title" style={{color: COLORS.secondary}}>
                                                            {lesson.title}
                                                        </h5>
                                                        <p className="card-text text-muted small">{lesson.description}</p>
                                                    </div>
                                                    <div className="card-footer bg-transparent border-top-0">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <small className="text-muted">
                                                                <i className="fas fa-user me-1"></i>{lesson.instructor}
                                                            </small>
                                                            <small className="text-muted">
                                                                <i className="fas fa-calendar me-1"></i>
                                                                {new Date(lesson.date).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title mb-4">
                                                        <i className="fas fa-book me-2"></i>Material Complementar
                                                    </h5>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <div className="d-flex align-items-center p-3 rounded" style={{backgroundColor: COLORS.grayLight}}>
                                                                <i className="fas fa-file-pdf fa-2x me-3" style={{color: COLORS.danger}}></i>
                                                                <div>
                                                                    <h6 className="mb-1">Slides da Aula</h6>
                                                                    <small className="text-muted">PDF - 2.4MB</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <div className="d-flex align-items-center p-3 rounded" style={{backgroundColor: COLORS.grayLight}}>
                                                                <i className="fas fa-code fa-2x me-3" style={{color: COLORS.accent}}></i>
                                                                <div>
                                                                    <h6 className="mb-1">Código Fonte</h6>
                                                                    <small className="text-muted">ZIP - 1.8MB</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <div className="d-flex align-items-center p-3 rounded" style={{backgroundColor: COLORS.grayLight}}>
                                                                <i className="fas fa-tasks fa-2x me-3" style={{color: COLORS.success}}></i>
                                                                <div>
                                                                    <h6 className="mb-1">Exercícios</h6>
                                                                    <small className="text-muted">PDF - 1.2MB</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {/* Adicionar nova página de calendário */}
            {currentPage === 'calendar' && isLoggedIn && (
                <div>
                    <section className="py-5 text-white" style={{background: COLORS.gradientPrimary}}>
                        <div className="container">
                            <div className="text-center">
                                <h1 className="display-4 mb-4">Calendário Acadêmico</h1>
                                <p className="lead mb-0">Acompanhe seus eventos e atividades acadêmicas</p>
                            </div>
                        </div>
                    </section>

                    <section className="py-5" style={{backgroundColor: COLORS.light}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h5 className="mb-0">
                                                    <i className="fas fa-calendar-alt me-2"></i>
                                                    {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                                                </h5>
                                                <div className="btn-group">
                                                    <button 
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                                    >
                                                        <i className="fas fa-chevron-left"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                                    >
                                                        <i className="fas fa-chevron-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="calendar-grid">
                                                <div className="calendar-header">
                                                    <div>Dom</div>
                                                    <div>Seg</div>
                                                    <div>Ter</div>
                                                    <div>Qua</div>
                                                    <div>Qui</div>
                                                    <div>Sex</div>
                                                    <div>Sáb</div>
                                                </div>
                                                
                                                <div className="calendar-body">
                                                    {(() => {
                                                        const year = currentMonth.getFullYear();
                                                        const month = currentMonth.getMonth();
                                                        
                                                        // Primeiro dia do mês
                                                        const firstDay = new Date(year, month, 1);
                                                        // Último dia do mês
                                                        const lastDay = new Date(year, month + 1, 0);
                                                        
                                                        // Dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
                                                        const firstDayOfWeek = firstDay.getDay();
                                                        
                                                        // Array para armazenar todos os dias do calendário
                                                        const days = [];
                                                        
                                                        // Adicionar dias do mês anterior
                                                        const prevMonthLastDay = new Date(year, month, 0).getDate();
                                                        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                                                            const date = new Date(year, month - 1, prevMonthLastDay - i);
                                                            days.push(date);
                                                        }
                                                        
                                                        // Adicionar dias do mês atual
                                                        for (let i = 1; i <= lastDay.getDate(); i++) {
                                                            days.push(new Date(year, month, i));
                                                        }
                                                        
                                                        // Adicionar dias do próximo mês
                                                        const remainingDays = 42 - days.length; // 6 semanas * 7 dias
                                                        for (let i = 1; i <= remainingDays; i++) {
                                                            days.push(new Date(year, month + 1, i));
                                                        }
                                                        
                                                        return days.map((date, index) => {
                                                            const dayEvents = academicEvents.filter(event => {
                                                                const eventDate = new Date(event.date);
                                                                return eventDate.toDateString() === date.toDateString();
                                                            });
                                                            
                                                            const isCurrentMonth = date.getMonth() === month;
                                                            const isToday = date.toDateString() === new Date().toDateString();
                                                            
                                                            return (
                                                                <div 
                                                                    key={index} 
                                                                    className={`calendar-day 
                                                                        ${!isCurrentMonth ? 'other-month' : ''} 
                                                                        ${dayEvents.length > 0 ? 'has-events' : ''}
                                                                        ${isToday ? 'today' : ''}`}
                                                                >
                                                                    <div className="day-number">{date.getDate()}</div>
                                                                    {dayEvents.map(event => (
                                                                        <div 
                                                                            key={event.id}
                                                                            className={`calendar-event ${event.type}`}
                                                                            onClick={() => setSelectedEvent(event)}
                                                                            title={event.title}
                                                                        >
                                                                            <i className={`fas ${
                                                                                event.type === 'exam' ? 'fa-file-alt' :
                                                                                event.type === 'assignment' ? 'fa-tasks' :
                                                                                event.type === 'workshop' ? 'fa-laptop-code' :
                                                                                'fa-users'
                                                                            }`}></i>
                                                                            {event.title}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-primary text-white">
                                            <h6 className="mb-0">
                                                <i className="fas fa-filter me-2"></i>
                                                Filtros
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Tipo de Evento</label>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="filter-exam" defaultChecked />
                                                        <label className="form-check-label" htmlFor="filter-exam">
                                                            <span className="badge bg-danger">Provas</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="filter-assignment" defaultChecked />
                                                        <label className="form-check-label" htmlFor="filter-assignment">
                                                            <span className="badge bg-warning">Trabalhos</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="filter-workshop" defaultChecked />
                                                        <label className="form-check-label" htmlFor="filter-workshop">
                                                            <span className="badge bg-info">Workshops</span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="filter-meeting" defaultChecked />
                                                        <label className="form-check-label" htmlFor="filter-meeting">
                                                            <span className="badge bg-success">Reuniões</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label">Disciplina</label>
                                                <select className="form-select">
                                                    <option value="">Todas as disciplinas</option>
                                                    <option value="web">Programação Web</option>
                                                    <option value="db">Banco de Dados</option>
                                                    <option value="tcc">Trabalho de Conclusão de Curso</option>
                                                    <option value="estagio">Estágio Supervisionado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {selectedEvent && (
                                        <div className="card shadow-sm">
                                            <div className="card-header" style={{
                                                backgroundColor: 
                                                    selectedEvent.type === 'exam' ? COLORS.danger :
                                                    selectedEvent.type === 'assignment' ? COLORS.warning :
                                                    selectedEvent.type === 'workshop' ? COLORS.info :
                                                    COLORS.success,
                                                color: 'white'
                                            }}>
                                                <h6 className="mb-0">
                                                    <i className={`fas ${
                                                        selectedEvent.type === 'exam' ? 'fa-file-alt' :
                                                        selectedEvent.type === 'assignment' ? 'fa-tasks' :
                                                        selectedEvent.type === 'workshop' ? 'fa-laptop-code' :
                                                        'fa-users'
                                                    } me-2`}></i>
                                                    {selectedEvent.title}
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <small className="text-muted d-block">Data e Hora</small>
                                                    <strong>
                                                        {new Date(selectedEvent.date).toLocaleDateString()} às {selectedEvent.time}
                                                        {selectedEvent.duration > 0 && ` (${selectedEvent.duration} min)`}
                                                    </strong>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <small className="text-muted d-block">Local</small>
                                                    <strong>{selectedEvent.location}</strong>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <small className="text-muted d-block">Disciplina</small>
                                                    <strong>{selectedEvent.discipline}</strong>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <small className="text-muted d-block">Professor</small>
                                                    <strong>{selectedEvent.professor}</strong>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <small className="text-muted d-block">Descrição</small>
                                                    <p className="mb-0">{selectedEvent.description}</p>
                                                </div>
                                                
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline-primary flex-grow-1">
                                                        <i className="fas fa-bell me-1"></i>
                                                        Lembrete
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-secondary flex-grow-1">
                                                        <i className="fas fa-calendar-plus me-1"></i>
                                                        Adicionar ao Google Calendar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            <footer className="bg-dark text-white py-4 text-center">
                <div className="container">
                    <h5 className="d-flex align-items-center justify-content-center gap-2 mb-3">
                        <WydenLogo size="30px" />
                        Faculdade Wyden
                    </h5>
                    <p>Faculdade Wyden - Conectando você ao futuro desde 1999.</p>
                    <p>&copy; 2024 Faculdade Wyden. Todos os direitos reservados.</p>
                </div>
            </footer>

            {/* Atualizar estilos das seções existentes */}
            <style>
                {`
                    .hover-shadow:hover {
                        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
                    }
                    
                    .card {
                        border: none;
                        border-radius: 0.5rem;
                        background: white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    
                    .badge {
                        padding: 0.5em 0.8em;
                        font-weight: 500;
                    }
                    
                    .btn-primary {
                        background: ${COLORS.gradientPrimary};
                        border: none;
                        color: white;
                    }
                    
                    .btn-primary:hover {
                        background: ${COLORS.primaryDark};
                        transform: translateY(-1px);
                    }
                    
                    .btn-secondary {
                        background: ${COLORS.gradientSecondary};
                        border: none;
                        color: white;
                    }
                    
                    .btn-accent {
                        background: ${COLORS.gradientAccent};
                        border: none;
                        color: white;
                    }
                    
                    .text-primary {
                        color: ${COLORS.primary} !important;
                    }
                    
                    .text-secondary {
                        color: ${COLORS.secondary} !important;
                    }
                    
                    .text-accent {
                        color: ${COLORS.accent} !important;
                    }
                    
                    .bg-primary {
                        background: ${COLORS.gradientPrimary} !important;
                    }
                    
                    .bg-secondary {
                        background: ${COLORS.gradientSecondary} !important;
                    }
                    
                    .bg-accent {
                        background: ${COLORS.gradientAccent} !important;
                    }
                    
                    .border-primary {
                        border-color: ${COLORS.primary} !important;
                    }
                    
                    .service-card {
                        transition: all 0.3s ease;
                        border: 1px solid ${COLORS.grayLight};
                    }
                    
                    .service-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
                        border-color: ${COLORS.primaryLight};
                    }
                    
                    .service-card i {
                        color: ${COLORS.primary};
                        transition: all 0.3s ease;
                    }
                    
                    .service-card:hover i {
                        color: ${COLORS.accent};
                        transform: scale(1.1);
                    }
                    
                    .course-card {
                        transition: all 0.3s ease;
                        border: 1px solid ${COLORS.grayLight};
                    }
                    
                    .course-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
                        border-color: ${COLORS.primaryLight};
                    }
                    
                    .course-image {
                        height: 160px;
                        background: ${COLORS.gradientPrimary};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 3rem;
                        transition: all 0.3s ease;
                    }
                    
                    .course-card:hover .course-image {
                    }
                    
                    .profile-photo {
                        width: 120px;
                        height: 120px;
                        margin: 0 auto;
                        border-radius: 50%;
                        background: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 4rem;
                        color: ${COLORS.primary};
                        overflow: hidden;
                    }
                    
                    .profile-photo img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    
                    .calendar-grid {
                        border: 1px solid ${COLORS.grayLight};
                        border-radius: 0.5rem;
                        overflow: hidden;
                    }
                    
                    .calendar-header {
                        display: grid;
                        grid-template-columns: repeat(7, 1fr);
                        background: ${COLORS.grayLight};
                        padding: 0.5rem;
                        font-weight: 600;
                        text-align: center;
                    }
                    
                    .calendar-body {
                        display: grid;
                        grid-template-columns: repeat(7, 1fr);
                        grid-auto-rows: minmax(100px, auto);
                    }
                    
                    .calendar-day {
                        border: 1px solid ${COLORS.grayLight};
                        padding: 0.5rem;
                        min-height: 100px;
                        background: white;
                    }
                    
                    .calendar-day.other-month {
                        background: ${COLORS.light};
                        color: ${COLORS.gray};
                    }
                    
                    .calendar-day.has-events {
                        background: ${COLORS.light};
                    }
                    
                    .day-number {
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                    }
                    
                    .calendar-event {
                        font-size: 0.8rem;
                        padding: 0.25rem 0.5rem;
                        margin-bottom: 0.25rem;
                        border-radius: 0.25rem;
                        cursor: pointer;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: white;
                    }
                    
                    .calendar-event.exam {
                        background: ${COLORS.danger};
                    }
                    
                    .calendar-event.assignment {
                        background: ${COLORS.warning};
                    }
                    
                    .calendar-event.workshop {
                        background: ${COLORS.info};
                    }
                    
                    .calendar-event.meeting {
                        background: ${COLORS.success};
                    }
                    
                    .calendar-event:hover {
                        filter: brightness(90%);
                    }
                    
                    .calendar-day.today {
                        background: ${COLORS.primaryLight}20;
                        border: 2px solid ${COLORS.primary};
                    }
                    
                    .calendar-day.today .day-number {
                        color: ${COLORS.primary};
                        font-weight: bold;
                    }
                    
                    .calendar-event {
                        font-size: 0.75rem;
                        padding: 0.2rem 0.4rem;
                        margin-bottom: 0.2rem;
                        border-radius: 0.25rem;
                        cursor: pointer;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: white;
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                    }
                    
                    .calendar-event i {
                        font-size: 0.7rem;
                    }
                    
                    .calendar-day {
                        position: relative;
                        min-height: 120px;
                    }
                    
                    .calendar-day.other-month {
                        opacity: 0.5;
                    }
                    
                    .calendar-day.has-events {
                        background: ${COLORS.light};
                    }
                    
                    .calendar-day.has-events:hover {
                        background: ${COLORS.grayLight};
                    }
                `}
            </style>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root')); 