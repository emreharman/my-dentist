import React, { useState, useEffect } from "react";
import axios from "axios";

const RandevuEkle = (props) => {
  console.log(props);
  const hastalar = props.location.hastalar;
  const randevular = props.location.randevular;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tel, setTel] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [tarih, setTarih] = useState("");
  const [saat, setSaat] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [hastaPosted, setHastaPosted] = useState(false);
  const [randevuPosted, setRandevuPosted] = useState(false);

  if (isSubmit) {
    props.history.push("");
  }
  const cleanForm = () => {
    setName("");
    setSurname("");
    setTel("");
    setSikayet("");
    setTarih("");
    setSaat("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isKayitliHasta = hastalar.filter((hasta) => {
      if (hasta.telNo === tel) {
        return true;
      }
    });
    let maxRandevuId;
    if (randevular.length == 0) {
      maxRandevuId = 0;
    } else {
      maxRandevuId = randevular[randevular.length - 1].id;
    }
    let maxHastaId;
    if (hastalar.length == 0) {
      maxHastaId = 0;
    } else {
      maxHastaId = hastalar[hastalar.length - 1].id;
    }

    const splitedDate = tarih.split("-");
    const yil = parseInt(splitedDate[0]);
    const ay = parseInt(splitedDate[1]);
    const gun = parseInt(splitedDate[2]);
    //daha önce kayıtlı hasta,sadece randevu kaydet.
    if (isKayitliHasta.length > 0) {
      const hasta = isKayitliHasta[0];
      const randevu = {
        id: maxRandevuId + 1,
        tarih: {
          gun: gun,
          ay: ay,
          yil: yil,
        },
        saat: saat,
        sikayet: sikayet,
        uygulananTedavi: "",
        hastaId: hasta.id,
      };
      axios
        .post("http://localhost:8000/randevular", randevu)
        .then((res) => {
          cleanForm();
          setIsSubmit(true);

          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      //yeni hasta
      const hasta = {
        id: maxHastaId + 1,
        name: name,
        surname: surname,
        dogumTarihi: "",
        telNo: tel,
        adres: {
          sehir: "",
          ilce: "",
          aciklama: "",
        },
      };
      const randevu = {
        id: maxRandevuId + 1,
        tarih: {
          gun: gun,
          ay: ay,
          yil: yil,
        },
        saat: saat,
        sikayet: sikayet,
        uygulananTedavi: "",
        hastaId: hasta.id,
      };
      axios
        .post("http://localhost:8000/hastalar", hasta)
        .then((res) => {
          setHastaPosted(true);
          console.log(res);
        })
        .catch((err) => console.log(err));
      axios
        .post("http://localhost:8000/randevular", randevu)
        .then((res) => {
          setRandevuPosted(true);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    if (hastaPosted && randevuPosted) {
      cleanForm();
      setIsSubmit(true);
    }
  }, [hastaPosted, randevuPosted]);
  return (
    <div className="container">
      <h4 className="mt-2 text-center">Randevu Ekle</h4>
      <form onSubmit={handleSubmit} className="mt-2 container">
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
            <label htmlFor="telNo">Telefon</label>
            <input
              type="tel"
              placeholder="05xxxxxxxxx "
              required
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
          <div className="col s6">
            <label htmlFor="sikayet">Şikayet</label>
            <input
              type="text"
              value={sikayet}
              onChange={(e) => setSikayet(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="tarih">Tarih</label>
            <input
              type="date"
              required
              value={tarih}
              onChange={(e) => setTarih(e.target.value)}
            />
          </div>
          <div className="col s6">
            <label htmlFor="saat">Saat</label>
            <input
              type="time"
              required
              value={saat}
              onChange={(e) => setSaat(e.target.value)}
            />
          </div>
        </div>
        <div className="row form-button-container">
          <button className="waves-effect waves-light btn red">Kaydet</button>
        </div>
        {isSubmit ? (
          <div className="row">
            <div
              class="card-panel red lighten-2 text-center"
              style={{ color: "white" }}
            >
              Kayıt Başarılı
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default RandevuEkle;
