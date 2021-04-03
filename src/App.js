import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import RandevuDuzenle from "./components/RandevuDuzenle";
import RandevuEkle from "./components/RandevuEkle";
import HastaIslemleri from "./components/HastaIslemleri";
import HastaRandevuDetay from "./components/HastaRandevuDetay";
import HastaGuncelle from "./components/HastaGuncelle";

function App() {
  setTimeout(() => {
    window.location.reload();
  }, 300000);
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/randevu-duzenle" component={RandevuDuzenle} />
          <Route path="/randevu-ekle" component={RandevuEkle} />
          <Route path="/hasta-islemleri" component={HastaIslemleri} />
          <Route path="/hasta-randevu-detay" component={HastaRandevuDetay} />
          <Route path="/hasta-guncelle" component={HastaGuncelle} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
