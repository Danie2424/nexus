import React, { useEffect, useState } from 'react';

interface CryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  inWatchlist: boolean;
}

interface MarketNews {
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  icon: string;
}

const Market: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrency[]>([
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'fab fa-bitcoin',
      price: 43250.65,
      change24h: 2.35,
      volume24h: '$24.8B',
      marketCap: '$845.2B',
      inWatchlist: false
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'fab fa-ethereum',
      price: 2380.45,
      change24h: 1.78,
      volume24h: '$12.3B',
      marketCap: '$285.7B',
      inWatchlist: true
    },
    {
      id: 3,
      name: 'Binance Coin',
      symbol: 'BNB',
      icon: 'fas fa-coins',
      price: 315.20,
      change24h: -0.45,
      volume24h: '$1.8B',
      marketCap: '$48.5B',
      inWatchlist: false
    },
    {
      id: 4,
      name: 'Cardano',
      symbol: 'ADA',
      icon: 'fas fa-gem',
      price: 0.52,
      change24h: 3.21,
      volume24h: '$480M',
      marketCap: '$18.3B',
      inWatchlist: false
    },
    {
      id: 5,
      name: 'Ripple',
      symbol: 'XRP',
      icon: 'fab fa-xing',
      price: 0.62,
      change24h: 0.85,
      volume24h: '$1.2B',
      marketCap: '$33.5B',
      inWatchlist: true
    },
    {
      id: 6,
      name: 'Dogecoin',
      symbol: 'DOGE',
      icon: 'fas fa-dog',
      price: 0.08,
      change24h: -1.25,
      volume24h: '$420M',
      marketCap: '$11.2B',
      inWatchlist: false
    },
    {
      id: 7,
      name: 'Chainlink',
      symbol: 'LINK',
      icon: 'fas fa-link',
      price: 14.32,
      change24h: 5.42,
      volume24h: '$680M',
      marketCap: '$8.1B',
      inWatchlist: false
    },
    {
      id: 8,
      name: 'Polkadot',
      symbol: 'DOT',
      icon: 'fas fa-puzzle-piece',
      price: 6.85,
      change24h: 2.15,
      volume24h: '$320M',
      marketCap: '$8.7B',
      inWatchlist: false
    }
  ]);

  const marketNews: MarketNews[] = [
    {
      title: 'Bitcoin Surges Past $43,000 Amid Institutional Adoption',
      excerpt: 'Major financial institutions continue to add Bitcoin to their balance sheets, driving prices to new monthly highs.',
      category: 'Crypto News',
      timeAgo: '2 hours ago',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Regulatory Clarity Boosts Ethereum Ecosystem',
      excerpt: 'Recent regulatory developments have provided much-needed clarity for Ethereum-based projects and DeFi protocols.',
      category: 'Regulation',
      timeAgo: '5 hours ago',
      icon: 'fas fa-landmark'
    },
    {
      title: 'NFT Market Sees Resurgence with New Gaming Projects',
      excerpt: 'Play-to-earn gaming platforms are driving renewed interest in the NFT market, with trading volumes up 40% this month.',
      category: 'NFT',
      timeAgo: '1 day ago',
      icon: 'fas fa-rocket'
    }
  ];

  const filterButtons = ['All', 'Gainers', 'Losers', 'DeFi', 'NFT', 'Metaverse'];
  const categories = ['All Categories', 'Currency', 'Platform', 'DeFi', 'NFT'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const toggleWatchlist = (id: number) => {
    setCryptocurrencies(prev => 
      prev.map(crypto => 
        crypto.id === id 
          ? { ...crypto, inWatchlist: !crypto.inWatchlist }
          : crypto
      )
    );
  };

  const updatePrices = () => {
    setCryptocurrencies(prev => 
      prev.map(crypto => {
        const randomChange = (Math.random() - 0.5) * 0.3;
        const newPrice = crypto.price * (1 + randomChange / 100);
        const newChange = crypto.change24h + randomChange;
        
        return {
          ...crypto,
          price: parseFloat(newPrice.toFixed(2)),
          change24h: parseFloat(newChange.toFixed(2))
        };
      })
    );
  };

  // Update prices every 10 seconds
  useEffect(() => {
    const interval = setInterval(updatePrices, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredCryptos = cryptocurrencies.filter(crypto => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'Gainers') return matchesSearch && crypto.change24h > 0;
    if (activeFilter === 'Losers') return matchesSearch && crypto.change24h < 0;
    
    return matchesSearch;
  });

  const topMovers = cryptocurrencies
    .sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h))
    .slice(0, 4);

  return (
    <>
      <style>{`
        :root {
          --primary: #F3BA2F;
          --secondary: #00C076;
          --accent: #FF6838;
          --dark: #000000;
          --dark-gray: #1A1A1A;
          --medium-gray: #2A2A2A;
          --light-gray: #AAAAAA;
          --white: #FFFFFF;
          --gradient: linear-gradient(135deg, #F3BA2F 0%, #FF6838 50%, #00C076 100%);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        body {
          background-color: var(--dark);
          color: var(--white);
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Header & Navigation */
        header {
          background-color: rgba(0, 0, 0, 0.9);
          padding: 20px 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s, padding 0.3s;
        }
        
        header.scrolled {
          background-color: rgba(0, 0, 0, 0.95);
          padding: 15px 0;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: 900;
          color: var(--primary);
        }
        
        .logo-icon {
          font-size: 28px;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 30px;
        }
        
        .nav-link {
          color: var(--white);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
          cursor: pointer;
        }
        
        .nav-link:hover {
          color: var(--primary);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--primary);
          transition: width 0.3s;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-link.active {
          color: var(--primary);
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background-color: var(--dark-gray);
          border-radius: 30px;
          padding: 8px 15px;
          width: 250px;
        }
        
        .search-bar input {
          background: transparent;
          border: none;
          color: var(--white);
          width: 100%;
          padding: 5px 10px;
          outline: none;
        }
        
        .search-icon {
          color: var(--light-gray);
        }
        
        .mobile-toggle {
          display: none;
          font-size: 24px;
          cursor: pointer;
        }
        
        /* Hero Section */
        .markets-hero {
          padding: 180px 0 100px;
          background: linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(0, 192, 118, 0.05) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        
        .markets-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .markets-hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        
        .markets-hero-title span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .markets-hero-subtitle {
          font-size: 1.2rem;
          color: var(--light-gray);
          margin-bottom: 30px;
        }
        
        /* Markets Content */
        .markets-content {
          padding: 80px 0;
          background-color: var(--dark-gray);
        }
        
        .markets-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: 2rem;
          margin-bottom: 30px;
          color: var(--white);
        }
        
        .section-title span {
          color: var(--primary);
        }
        
        /* Market Stats */
        .market-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: var(--light-gray);
        }
        
        /* Market Controls */
        .market-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .filter-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          background-color: var(--medium-gray);
          border: none;
          color: var(--white);
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .filter-btn.active {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        .filter-btn:hover {
          background-color: var(--primary);
          color: var(--dark);
        }
        
        .search-controls {
          display: flex;
          gap: 15px;
        }
        
        .search-control {
          background-color: var(--medium-gray);
          border: none;
          color: var(--white);
          padding: 8px 15px;
          border-radius: 8px;
        }
        
        /* Markets Table */
        .markets-table-container {
          background-color: var(--dark);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          margin-bottom: 50px;
        }
        
        .markets-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .markets-table th {
          background-color: var(--medium-gray);
          padding: 15px;
          text-align: left;
          font-weight: 600;
          color: var(--primary);
          cursor: pointer;
          user-select: none;
        }
        
        .markets-table th:hover {
          background-color: rgba(243, 186, 47, 0.1);
        }
        
        .markets-table td {
          padding: 15px;
          border-bottom: 1px solid var(--medium-gray);
        }
        
        .markets-table tr:last-child td {
          border-bottom: none;
        }
        
        .markets-table tr:hover {
          background-color: rgba(243, 186, 47, 0.05);
        }
        
        .crypto-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--medium-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        
        .crypto-symbol {
          font-size: 0.8rem;
          color: var(--light-gray);
        }
        
        .positive {
          color: var(--secondary);
        }
        
        .negative {
          color: var(--accent);
        }
        
        .watchlist-btn {
          background: none;
          border: none;
          color: var(--light-gray);
          cursor: pointer;
          font-size: 16px;
          transition: color 0.3s;
        }
        
        .watchlist-btn:hover {
          color: var(--primary);
        }
        
        .watchlist-btn.active {
          color: var(--primary);
        }
        
        /* Top Movers */
        .top-movers {
          margin-bottom: 50px;
        }
        
        .movers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .mover-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: transform 0.3s;
        }
        
        .mover-card:hover {
          transform: translateY(-5px);
        }
        
        .mover-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .mover-info {
          flex: 1;
        }
        
        .mover-name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .mover-symbol {
          font-size: 0.8rem;
          color: var(--light-gray);
        }
        
        .mover-change {
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        /* Market News */
        .market-news {
          margin-bottom: 50px;
        }
        
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .news-card {
          background-color: var(--medium-gray);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s;
        }
        
        .news-card:hover {
          transform: translateY(-5px);
        }
        
        .news-image {
          height: 160px;
          background-color: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 40px;
        }
        
        .news-content {
          padding: 20px;
        }
        
        .news-title {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        
        .news-excerpt {
          color: var(--light-gray);
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        
        .news-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--light-gray);
        }
        
        /* Footer */
        footer {
          background-color: var(--dark-gray);
          padding: 60px 0 20px;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .footer-column h3 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: var(--primary);
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-links a {
          color: var(--light-gray);
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .footer-links a:hover {
          color: var(--primary);
        }
        
        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--medium-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          transition: background-color 0.3s, transform 0.3s;
        }
        
        .social-link:hover {
          background-color: var(--primary);
          transform: translateY(-3px);
          color: var(--dark);
        }
        
        .copyright {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid var(--medium-gray);
          color: var(--light-gray);
          font-size: 14px;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .markets-hero-title {
            font-size: 2.8rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .market-controls {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .search-controls {
            width: 100%;
            justify-content: space-between;
          }
        }
        
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            flex-direction: column;
            background-color: var(--dark);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
            gap: 0;
          }
          
          .nav-menu.active {
            left: 0;
          }
          
          .nav-link {
            padding: 15px 0;
            display: block;
          }
          
          .mobile-toggle {
            display: block;
          }
          
          .search-bar {
            display: none;
          }
          
          .markets-hero-title {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
          
          .markets-table {
            display: block;
            overflow-x: auto;
          }
        }
        
        @media (max-width: 576px) {
          .markets-hero-title {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
          
          .market-stats {
            grid-template-columns: 1fr 1fr;
          }
          
          .filter-buttons {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>



      {/* Hero Section */}
      <section className="markets-hero">
        <div className="container">
          <div className="markets-hero-content">
            <h1 className="markets-hero-title">Live <span>Market Trends</span></h1>
            <p className="markets-hero-subtitle">Track real-time cryptocurrency prices, trends, and market movements with Nexus Exchange's advanced market tools.</p>
          </div>
        </div>
      </section>

      {/* Markets Content */}
      <section className="markets-content">
        <div className="container">
          <div className="markets-container">
            {/* Market Stats */}
            <div className="market-stats">
              <div className="stat-card">
                <div className="stat-value">$1.74T</div>
                <div className="stat-label">Total Market Cap</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">$64.2B</div>
                <div className="stat-label">24h Trading Volume</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">42.5%</div>
                <div className="stat-label">Bitcoin Dominance</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">9,821</div>
                <div className="stat-label">Active Cryptocurrencies</div>
              </div>
            </div>

            {/* Market Controls */}
            <div className="market-controls">
              <div className="filter-buttons">
                {filterButtons.map(filter => (
                  <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => handleFilterClick(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              <div className="search-controls">
                <select 
                  className="search-control" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input 
                  type="text" 
                  className="search-control" 
                  placeholder="Search crypto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Markets Table */}
            <h2 className="section-title">Top <span>Cryptocurrencies</span></h2>
            <div className="markets-table-container">
              <table className="markets-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                    <th>Last 7 Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCryptos.map((crypto, index) => (
                    <tr key={crypto.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="crypto-name">
                          <div className="crypto-icon">
                            <i className={crypto.icon}></i>
                          </div>
                          <div>
                            <div>{crypto.name}</div>
                            <div className="crypto-symbol">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td>${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className={crypto.change24h >= 0 ? 'positive' : 'negative'}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </td>
                      <td>{crypto.volume24h}</td>
                      <td>{crypto.marketCap}</td>
                      <td>
                        <div 
                          style={{ 
                            width: '80px', 
                            height: '30px', 
                            background: `linear-gradient(90deg, ${crypto.change24h >= 0 ? 'var(--secondary)' : 'var(--accent)'} ${Math.abs(crypto.change24h) * 20}%, var(--medium-gray) ${100 - Math.abs(crypto.change24h) * 20}%)`, 
                            borderRadius: '4px' 
                          }}
                        ></div>
                      </td>
                      <td>
                        <button 
                          className={`watchlist-btn ${crypto.inWatchlist ? 'active' : ''}`}
                          onClick={() => toggleWatchlist(crypto.id)}
                          title={crypto.inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                        >
                          <i className={crypto.inWatchlist ? 'fas fa-star' : 'far fa-star'}></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Movers */}
            <h2 className="section-title">Today's <span>Top Movers</span></h2>
            <div className="top-movers">
              <div className="movers-grid">
                {topMovers.map(mover => (
                  <div key={mover.id} className="mover-card">
                    <div className="mover-icon">
                      <i className={mover.icon}></i>
                    </div>
                    <div className="mover-info">
                      <div className="mover-name">{mover.name}</div>
                      <div className="mover-symbol">{mover.symbol}</div>
                    </div>
                    <div className={`mover-change ${mover.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {mover.change24h >= 0 ? '+' : ''}{mover.change24h.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market News */}
            <h2 className="section-title">Crypto <span>Market News</span></h2>
            <div className="market-news">
              <div className="news-grid">
                {marketNews.map((news, index) => (
                  <div key={index} className="news-card">
                    <div className="news-image">
                      <i className={news.icon}></i>
                    </div>
                    <div className="news-content">
                      <h3 className="news-title">{news.title}</h3>
                      <p className="news-excerpt">{news.excerpt}</p>
                      <div className="news-meta">
                        <span>{news.category}</span>
                        <span>{news.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Market;