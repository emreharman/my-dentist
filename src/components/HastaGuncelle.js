import React, { useState } from "react";
import axios from "axios";

const HastaGuncelle = (props) => {
  const hasta = props.location.hasta;
  const randevular = props.location.randevular;
  const [name, setName] = useState(hasta.name);
  const [surname, setSurname] = useState(hasta.surname);
  const [tel, setTel] = useState(hasta.telNo);
  const [aciklama, setAciklama] = useState(hasta.adres.aciklama);
  const [sehir, setSehir] = useState(hasta.adres.sehir);
  const [ilce, setIlce] = useState(hasta.adres.ilce);
  const [dogumTarihi, setDogumTarihi] = useState(hasta.dogumTarihi);
  const [isSubmit, setIsSubmit] = useState(false);

  if (isSubmit) {
    props.history.push("/hasta-islemleri");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const putHasta = {
      id: hasta.id,
      name: name,
      surname: surname,
      dogumTarihi: dogumTarihi,
      telNo: tel,
      adres: {
        sehir: sehir,
        ilce: ilce,
        aciklama: aciklama,
      },
    };
    axios
      .put(`http://localhost:8000/hastalar/${hasta.id}`, putHasta)
      .then((res) => {
        console.log(res);
        setIsSubmit(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h4 className="text-center mt-2">Hasta Güncelle</h4>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="row">
          <div className="col s6">
            <label htmlFor="name">İsim</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col s6">
            <label htmlFor="surname">Soyisim</label>
            <input
              type="text"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="tel">Telefon</label>
            <input
              type="text"
              required
              value={tel}
              onChange={(e) => setTel(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col s6">
            <label htmlFor="surname">Doğum Tarihi</label>
            <input
              type="text"
              value={dogumTarihi}
              onChange={(e) => setDogumTarihi(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="name">Mah, Cad, Sokak</label>
            <input
              type="text"
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col s3">
            <label htmlFor="surname">İlçe</label>
            <input
              type="text"
              value={ilce}
              onChange={(e) => setIlce(e.target.value.toUpperCase())}
            />
          </div>
          <div className="col s3">
            <label htmlFor="surname">Şehir</label>
            <input
              type="text"
              value={sehir}
              onChange={(e) => setSehir(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row form-button-container mt-2">
          <button className="waves-effect waves-light btn red">Kaydet</button>
        </div>
      </form>
    </div>
  );
};

export default HastaGuncelle;
