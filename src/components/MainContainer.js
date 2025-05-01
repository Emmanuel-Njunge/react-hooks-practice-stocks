import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  function handleBuyStock(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  }

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else {
      return a.price - b.price;
    }
  });

  const filteredStocks = filterBy === "All" 
    ? sortedStocks 
    : sortedStocks.filter((stock) => stock.type === filterBy);

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={filteredStocks} 
            onStockClick={handleBuyStock} 
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            stocks={portfolio} 
            onStockClick={handleSellStock} 
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;