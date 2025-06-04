const { useState } = React;

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [userPageEmail, setUserPageEmail] = useState(null);

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
        <div>
            <nav className="navbar navbar-expand-lg sticky-top" style={{background: 'linear-gradient(135deg, #E53E3E, #C53030)'}}>
                <div className="container">
                    <a className="navbar-brand text-white d-flex align-items-center gap-2" 
                       href="#" onClick={() => showPage('home')}>
                        <WydenLogo />
                        <strong>Faculdade Wyden</strong>
                    </a>
                    
                    <div className="d-flex gap-4 align-items-center">
                        <a className="text-white text-decoration-none" href="#" onClick={() => showPage('home')}>Início</a>
                        <a className="text-white text-decoration-none" href="#" onClick={() => showPage('courses')}>Cursos</a>
                        <a className="text-white text-decoration-none" href="#" onClick={() => showPage('news')}>Notícias</a>
                        <a className="text-white text-decoration-none" href="#" onClick={() => showPage('contact')}>Contato</a>
                        
                        {!isLoggedIn ? (
                            <a className="text-white text-decoration-none" href="#" onClick={() => showPage('login')}>
                                <i className="fas fa-sign-in-alt"></i> Portal
                            </a>
                        ) : (
                            <div className="position-relative user-dropdown-container">
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
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Página Inicial */}
            {currentPage === 'home' && (
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
                            <div className="row mb-5">
                                <div className="col-md-8 mx-auto text-center">
                                    <h2 className="section-title">Graduação</h2>
                                    <p className="text-muted">Cursos reconhecidos pelo MEC com foco no mercado de trabalho</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 course-card">
                                        <div className="course-image">
                                            <i className="fas fa-laptop-code"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Sistemas de Informação</h5>
                                            <div className="mb-3">
                                                <span className="badge bg-primary">4 anos</span>
                                                <span className="badge bg-secondary ms-2">Bacharelado</span>
                                            </div>
                                            <p className="card-text">Desenvolva soluções tecnológicas inovadoras e gerencie sistemas complexos.</p>
                                            <ul className="list-unstyled">
                                                <li><i className="fas fa-check text-success me-2"></i>Programação Avançada</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Banco de Dados</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Engenharia de Software</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Gestão de Projetos</li>
                                            </ul>
                                            <div className="mt-auto">
                                                <small className="text-muted"><i className="fas fa-clock me-1"></i>Noturno e Matutino</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 course-card">
                                        <div className="course-image">
                                            <i className="fas fa-balance-scale"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Direito</h5>
                                            <div className="mb-3">
                                                <span className="badge bg-primary">5 anos</span>
                                                <span className="badge bg-secondary ms-2">Bacharelado</span>
                                            </div>
                                            <p className="card-text">Formação jurídica sólida com ética profissional e responsabilidade social.</p>
                                            <ul className="list-unstyled">
                                                <li><i className="fas fa-check text-success me-2"></i>Direito Civil e Penal</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Direito Constitucional</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Prática Jurídica</li>
                                                <li><i className="fas fa-check text-success me-2"></i>OAB Intensivo</li>
                                            </ul>
                                            <div className="mt-auto">
                                                <small className="text-muted"><i className="fas fa-clock me-1"></i>Matutino e Noturno</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 course-card">
                                        <div className="course-image">
                                            <i className="fas fa-briefcase"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Administração</h5>
                                            <div className="mb-3">
                                                <span className="badge bg-primary">4 anos</span>
                                                <span className="badge bg-secondary ms-2">Bacharelado</span>
                                            </div>
                                            <p className="card-text">Forme-se para liderar organizações e tomar decisões estratégicas.</p>
                                            <ul className="list-unstyled">
                                                <li><i className="fas fa-check text-success me-2"></i>Gestão Empresarial</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Finanças Corporativas</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Marketing Estratégico</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Empreendedorismo</li>
                                            </ul>
                                            <div className="mt-auto">
                                                <small className="text-muted"><i className="fas fa-clock me-1"></i>Matutino e Noturno</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 course-card">
                                        <div className="course-image">
                                            <i className="fas fa-brain"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Psicologia</h5>
                                            <div className="mb-3">
                                                <span className="badge bg-primary">5 anos</span>
                                                <span className="badge bg-secondary ms-2">Bacharelado</span>
                                            </div>
                                            <p className="card-text">Compreenda o comportamento humano e promova bem-estar mental.</p>
                                            <ul className="list-unstyled">
                                                <li><i className="fas fa-check text-success me-2"></i>Psicologia Clínica</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Neuropsicologia</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Psicologia Social</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Psicoterapia</li>
                                            </ul>
                                            <div className="mt-auto">
                                                <small className="text-muted"><i className="fas fa-clock me-1"></i>Vespertino e Noturno</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 course-card">
                                        <div className="course-image">
                                            <i className="fas fa-bullseye"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Marketing</h5>
                                            <div className="mb-3">
                                                <span className="badge bg-primary">4 anos</span>
                                                <span className="badge bg-secondary ms-2">Bacharelado</span>
                                            </div>
                                            <p className="card-text">Domine estratégias de comunicação e construção de marcas impactantes.</p>
                                            <ul className="list-unstyled">
                                                <li><i className="fas fa-check text-success me-2"></i>Marketing Digital</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Branding e Design</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Mídias Sociais</li>
                                                <li><i className="fas fa-check text-success me-2"></i>E-commerce</li>
                                            </ul>
                                            <div className="mt-auto">
                                                <small className="text-muted"><i className="fas fa-clock me-1"></i>Noturno</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-4">
                                    <div className="card h-100 course-card">
                                        <div className="course-image">
                                            <i className="fas fa-chart-line"></i>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Gestão Financeira</h5>
                                            <div className="mb-3">
                                                <span className="badge bg-primary">4 anos</span>
                                                <span className="badge bg-secondary ms-2">Tecnólogo</span>
                                            </div>
                                            <p className="card-text">Especialista em planejamento financeiro e investimentos corporativos.</p>
                                            <ul className="list-unstyled">
                                                <li><i className="fas fa-check text-success me-2"></i>Análise de Investimentos</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Controladoria</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Mercado de Capitais</li>
                                                <li><i className="fas fa-check text-success me-2"></i>Planejamento Tributário</li>
                                            </ul>
                                            <div className="mt-auto">
                                                <small className="text-muted"><i className="fas fa-clock me-1"></i>Noturno</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col-md-8 mx-auto text-center">
                                    <h3 className="mb-4">Por que escolher a Wyden?</h3>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <div className="text-center">
                                                <i className="fas fa-certificate fa-2x text-primary mb-2"></i>
                                                <h6>MEC Aprovado</h6>
                                                <small className="text-muted">Cursos reconhecidos</small>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <div className="text-center">
                                                <i className="fas fa-users fa-2x text-primary mb-2"></i>
                                                <h6>Professores Mestres</h6>
                                                <small className="text-muted">85% com mestrado/doutorado</small>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <div className="text-center">
                                                <i className="fas fa-building fa-2x text-primary mb-2"></i>
                                                <h6>Infraestrutura</h6>
                                                <small className="text-muted">Laboratórios modernos</small>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <div className="text-center">
                                                <i className="fas fa-handshake fa-2x text-primary mb-2"></i>
                                                <h6>Empregabilidade</h6>
                                                <small className="text-muted">92% dos formandos empregados</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                                                alert('Email não encontrado! Tente:\n• gustavo.honorato@aluno.wyden.edu.br\n• joao.silva@aluno.wyden.edu.br\n• guilherme.batista@aluno.wyden.edu.br\n• daniel.bersi@aluno.wyden.edu.br\n• eduardo.henrique@aluno.wyden.edu.br\n• fabio.henrique@aluno.wyden.edu.br\n• maria.santos@wyden.edu.br\n• carlos.admin@wyden.edu.br');
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
                                                <div className="col-sm-5"><strong>CPF:</strong></div>
                                                <div className="col-sm-7">{currentUser.cpf}</div>
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
                                    <a href={`/${currentUser.email}`} 
                                       target="_blank" 
                                       style={{
                                           color: 'var(--primary-color)', 
                                           textDecoration: 'none',
                                           display: 'flex',
                                           flexDirection: 'column',
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                           width: '100%',
                                           height: '100%'
                                       }}
                                       title="Clique para acessar informações públicas"
                                    >
                                        QR<br />CODE
                                    </a>
                                </div>
                                
                                <div className="emergency-info">
                                    <p><strong>RG:</strong> {currentUser.rg}</p>
                                    <p><strong>Emergência:</strong> {currentUser.telefone}</p>
                                    <p><strong>Válida até:</strong> 12/2025</p>
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
                                            <small className="text-muted">15 de Novembro, 2024</small>
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
                                                <div className="fw-bold text-primary">18 Nov</div>
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
                                                                        <small className="text-muted">RG:</small><br />
                                                                        <strong>{user.rg}</strong>
                                                                    </div>
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
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root')); 