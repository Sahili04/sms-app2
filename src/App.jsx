import { useState, useEffect, useRef } from "react";

const schemes = [
  {
    id:1, name:"मुख्यमंत्री माझी लाडकी बहीण योजना", cat:"महिला",
    benefits:[
      "दरमहा Rs.1,500 थेट बँक खात्यात (DBT)",
      "वार्षिक Rs.18,000 आर्थिक सहाय्य",
      "महिलांचे आर्थिक सक्षमीकरण",
      "कुटुंबातील एका महिलेला लाभ"
    ],
    eligibility:[
      "वयोमर्यादा: 21-65 वर्षे",
      "कुटुंबाचे वार्षिक उत्पन्न: Rs.2.5 लाख पेक्षा कमी",
      "महाराष्ट्राची रहिवासी असणे आवश्यक",
      "विवाहित, विधवा, घटस्फोटित, परित्यक्त महिला पात्र"
    ],
    documents:[
      "📄 आधार कार्ड (स्वतःचा)",
      "📄 रेशन कार्ड (पिवळे/केशरी)",
      "🏦 बँक पासबुक (DBT साठी)",
      "📄 उत्पन्न दाखला (तहसीलदार कार्यालयातून)",
      "📷 पासपोर्ट साइज फोटो",
      "📄 रहिवास दाखला / अधिवास प्रमाणपत्र",
      "📄 वयाचा पुरावा (जन्म प्रमाणपत्र / शाळेचा दाखला)"
    ],
    apply_at:"ग्रामपंचायत / नगरपालिका कार्यालय / तहसील कार्यालय",
    helpline:"1800-120-8040 (टोल-फ्री)",
    note:"⚠️ अर्ज मंजूर झाल्यानंतर 45 दिवसांत पहिला हप्ता मिळतो. बँक खाते आधार लिंक असणे अनिवार्य आहे."
  },
  {
    id:2, name:"PM किसान सन्मान निधी", cat:"शेतकरी",
    benefits:[
      "वार्षिक Rs.6,000 (Rs.2,000 x 3 हप्ते)",
      "एप्रिल-जुलै, ऑगस्ट-नोव्हेंबर, डिसेंबर-मार्च हप्ते",
      "थेट बँक खात्यात (DBT) जमा",
      "कोणत्याही जमीनधारक शेतकऱ्यांसाठी"
    ],
    eligibility:[
      "2 हेक्टरपर्यंत शेतजमीन असणे आवश्यक",
      "शेतजमीन स्वतःच्या नावावर असावी",
      "सरकारी नोकरदार / करदाते पात्र नाहीत",
      "निवृत्तीवेतन धारक पात्र नाहीत (Rs.10,000+ पेन्शन)"
    ],
    documents:[
      "📄 आधार कार्ड",
      "📄 जमीन 7/12 उतारा (अद्ययावत)",
      "📄 8-अ उतारा",
      "🏦 बँक पासबुक (IFSC कोडसह)",
      "📱 मोबाइल नंबर (आधार लिंक)"
    ],
    apply_at:"कृषी विभाग / CSC केंद्र / तलाठी कार्यालय",
    helpline:"155261 / 011-24300606",
    note:"⚠️ दर 4 महिन्यांनी eKYC करणे अनिवार्य. pmkisan.gov.in वर स्टेटस तपासता येतो."
  },
  {
    id:3, name:"संजय गांधी निराधार अनुदान", cat:"निराधार",
    benefits:[
      "दरमहा Rs.600 अनुदान",
      "निराधार व्यक्तींना आर्थिक आधार",
      "विधवा, अनाथ, अपंग, दुर्धर आजारी पात्र",
      "निराधार वृद्धांसाठी विशेष तरतूद"
    ],
    eligibility:[
      "महाराष्ट्रातील रहिवासी",
      "कुटुंबात कमावता व्यक्ती नसणे",
      "वार्षिक उत्पन्न Rs.21,000 पेक्षा कमी",
      "BPL कुटुंब / कोणताही उत्पन्नाचा स्रोत नसणे"
    ],
    documents:[
      "📄 आधार कार्ड",
      "📄 रहिवास प्रमाणपत्र (15 वर्षांचे)",
      "📄 उत्पन्न दाखला",
      "📄 निराधार प्रमाणपत्र (तहसीलदार)",
      "🏥 वैद्यकीय प्रमाणपत्र (अपंगत्व / आजारासाठी)",
      "📄 मृत्यू प्रमाणपत्र (विधवांसाठी)",
      "🏦 बँक पासबुक",
      "📷 पासपोर्ट साइज फोटो (2)"
    ],
    apply_at:"जिल्हा समाजकल्याण कार्यालय / तहसील कार्यालय",
    helpline:"1800-120-8040 (टोल-फ्री)",
    note:"⚠️ दरवर्षी नूतनीकरण करणे आवश्यक. ग्रामसेवक / तलाठी यांच्याकडून अर्ज मिळतो."
  },
  {
    id:4, name:"शिष्यवृत्ती योजना (OBC/SC/ST)", cat:"शिक्षण",
    benefits:[
      "वार्षिक Rs.10,000 ते Rs.50,000 शिष्यवृत्ती",
      "शिक्षण शुल्क, परीक्षा शुल्क माफ",
      "वसतिगृह भत्ता / निर्वाह भत्ता",
      "इयत्ता 1 ते पदव्युत्तर शिक्षणासाठी",
      "व्यावसायिक अभ्यासक्रमांसाठी अतिरिक्त लाभ"
    ],
    eligibility:[
      "OBC/SC/ST/VJNT/SBC प्रवर्गातील विद्यार्थी",
      "कुटुंबाचे वार्षिक उत्पन्न: OBC - Rs.8 लाख, SC/ST - उत्पन्न मर्यादा नाही",
      "मान्यताप्राप्त शाळा/महाविद्यालयात प्रवेश",
      "मागील परीक्षेत किमान 50% गुण (काही योजनांसाठी)"
    ],
    documents:[
      "📄 जाती प्रमाणपत्र (तहसीलदार)",
      "📄 जात वैधता प्रमाणपत्र (VJNT/SBC साठी)",
      "📄 उत्पन्न दाखला (मागील वर्षाचा)",
      "📄 गुणपत्रिका / मार्कशीट",
      "📄 प्रवेश पावती / बोनाफाइड",
      "📄 आधार कार्ड",
      "🏦 बँक पासबुक (आधार लिंक)",
      "📷 पासपोर्ट साइज फोटो",
      "📄 GAP सर्टिफिकेट (शिक्षणात खंड असल्यास)"
    ],
    apply_at:"mahaeschol.in पोर्टल (ऑनलाइन अर्ज)",
    helpline:"022-22025251 / mahaeschol हेल्पडेस्क",
    note:"⚠️ दरवर्षी ऑनलाइन नूतनीकरण आवश्यक. अर्जाची अंतिम तारीख साधारणतः डिसेंबर/जानेवारी असते."
  },
  {
    id:5, name:"अटल पेन्शन योजना", cat:"पेन्शन",
    benefits:[
      "Rs.1,000 ते Rs.5,000 मासिक पेन्शन (60 वर्षानंतर)",
      "सरकारचे 50% सह-योगदान (5 वर्षांसाठी)",
      "पत्नी/पतीला पेन्शन चालू ठेवता येते",
      "नॉमिनीला एकरकमी रक्कम मिळते",
      "कर सवलत Section 80CCD अंतर्गत"
    ],
    eligibility:[
      "वय: 18-40 वर्षे",
      "भारतीय नागरिक",
      "बचत बँक खाते असणे आवश्यक",
      "कोणत्याही सामाजिक सुरक्षा योजनेचा लाभार्थी नसणे",
      "आयकर भरणारा नसणे"
    ],
    documents:[
      "📄 आधार कार्ड",
      "🏦 बँक खाते / पासबुक",
      "📱 मोबाइल नंबर (बँकेशी लिंक)",
      "📷 पासपोर्ट साइज फोटो"
    ],
    apply_at:"कोणत्याही राष्ट्रीयीकृत बँकेत / पोस्ट ऑफिसमध्ये",
    helpline:"1800-110-069 (टोल-फ्री)",
    note:"⚠️ मासिक/त्रैमासिक/सहामाही योगदान निवडता येते. वय 18 वर्षे असताना सुरू केल्यास सर्वात कमी हप्ता."
  },
  {
    id:6, name:"आयुष्मान भारत - PM-JAY", cat:"आरोग्य",
    benefits:[
      "वार्षिक Rs.5 लाखांपर्यंत मोफत उपचार",
      "1,929+ उपचार पॅकेजेस समाविष्ट",
      "सरकारी व खाजगी (एम्पॅनेल्ड) रुग्णालयांत",
      "हॉस्पिटलायझेशन + 3 दिवस पूर्व व 15 दिवस उत्तर उपचार",
      "कुटुंबातील सर्व सदस्यांना लाभ",
      "कोणतीही वयोमर्यादा नाही"
    ],
    eligibility:[
      "SECC 2011 डेटाबेसमध्ये नाव असणे आवश्यक",
      "BPL कुटुंब / रेशन कार्ड धारक",
      "आधीपासून कोणत्याही सरकारी विमा योजनेचा लाभार्थी नसणे",
      "mera.pmjay.gov.in वर पात्रता तपासता येते"
    ],
    documents:[
      "📄 आधार कार्ड (कुटुंबातील सर्व सदस्यांचे)",
      "📄 रेशन कार्ड",
      "📄 आयुष्मान कार्ड (रुग्णालयात बनवता येते)",
      "📱 मोबाइल नंबर"
    ],
    apply_at:"जवळच्या सरकारी रुग्णालयात / CSC केंद्र / आरोग्य मित्र",
    helpline:"14555 / 1800-111-565 (टोल-फ्री)",
    note:"⚠️ आयुष्मान कार्ड मोफत मिळते. रुग्णालयात दाखल होण्यापूर्वी कार्ड बनवून घ्या."
  },
  {
    id:7, name:"महात्मा फुले जनआरोग्य योजना", cat:"आरोग्य",
    benefits:[
      "Rs.1.5 लाखांपर्यंत मोफत शस्त्रक्रिया",
      "Rs.2.5 लाख (किडनी प्रत्यारोपण)",
      "996 आजार व 1,134 शस्त्रक्रिया समाविष्ट",
      "मोफत OPD तपासणी + औषधे",
      "रुग्णवाहिका सेवा (निवडक रुग्णालये)"
    ],
    eligibility:[
      "पिवळे/केशरी/अंत्योदय रेशन कार्ड धारक",
      "महाराष्ट्राचे कायमचे रहिवासी",
      "शेतकरी कुटुंबातील सदस्य (विशेष तरतूद)",
      "अन्नपूर्णा योजना लाभार्थी पात्र"
    ],
    documents:[
      "📄 पिवळे/केशरी रेशन कार्ड",
      "📄 आधार कार्ड",
      "📄 शिधापत्रिका (रेशन कार्ड)",
      "📷 फोटो ओळखपत्र",
      "🏥 डॉक्टरांचे रेफरल लेटर (आवश्यक असल्यास)"
    ],
    apply_at:"नेटवर्क रुग्णालय / जिल्हा रुग्णालय / आरोग्य सेवक",
    helpline:"155388 / 1800-233-2200 (टोल-फ्री)",
    note:"⚠️ शस्त्रक्रियेपूर्वी नेटवर्क रुग्णालयाची यादी तपासा. www.jeevandayee.gov.in वर उपलब्ध."
  },
  {
    id:8, name:"मनरेगा (MGNREGA)", cat:"रोजगार",
    benefits:[
      "वर्षातून 100 दिवस रोजगार हमी",
      "Rs.273/दिवस मजुरी (महाराष्ट्र)",
      "5 किमी अंतरात काम मिळते",
      "15 दिवसांत काम न मिळाल्यास बेरोजगारी भत्ता",
      "कामावरील इजा - मोफत उपचार",
      "महिलांना 1/3 आरक्षण"
    ],
    eligibility:[
      "ग्रामीण भागातील प्रौढ कुटुंब सदस्य",
      "अकुशल शारीरिक काम करण्यास तयार",
      "जॉब कार्ड असणे आवश्यक",
      "कोणतीही उत्पन्न मर्यादा नाही"
    ],
    documents:[
      "📄 जॉब कार्ड (ग्रामपंचायतमधून मिळते)",
      "📄 आधार कार्ड",
      "📷 पासपोर्ट साइज फोटो (कुटुंबातील सर्व सदस्यांचे)",
      "🏦 बँक/पोस्ट ऑफिस पासबुक"
    ],
    apply_at:"ग्रामपंचायत / तालुका पंचायत समिती",
    helpline:"1800-345-3000 (टोल-फ्री)",
    note:"⚠️ जॉब कार्ड मोफत मिळते. कामाची मागणी लेखी द्या - 15 दिवसांत काम मिळणे बंधनकारक."
  },
];

function SchemeList({ onSelect }) {
  return (
    <div>
      <p style={{ marginBottom: 10 }}>
        <strong>{schemes.length} सरकारी योजना उपलब्ध</strong>
        <br />
        <span style={{ color: "#666", fontSize: 12 }}>नंबर टाइप करा - अधिक माहितीसाठी</span>
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {schemes.map((s) => (
          <div key={s.id} onClick={() => onSelect(s.id)} style={styles.sitem}>
            <div style={{ fontSize: 11, color: "#25D366", fontWeight: 700, marginBottom: 2 }}>{s.id}.</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e8e8e8" }}>{s.name}</div>
            <span style={styles.scat}>{s.cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchemeDetail({ id }) {
  const s = schemes.find((x) => x.id === id);
  if (!s) return null;
  return (
    <div style={styles.dcard}>
      <div style={styles.dtitle}>{s.name}</div>
      <span style={{...styles.scat, marginBottom: 10}}>{s.cat}</span>

      {/* Benefits */}
      <div style={{...styles.drow, marginTop: 10}}>
        <div style={styles.dlabel}>✅ फायदे</div>
        <div style={styles.dval}>
          {s.benefits.map((b, i) => <div key={i} style={{marginBottom: 3}}>• {b}</div>)}
        </div>
      </div>

      {/* Eligibility */}
      <div style={styles.drow}>
        <div style={styles.dlabel}>👤 पात्रता</div>
        <div style={styles.dval}>
          {s.eligibility.map((e, i) => <div key={i} style={{marginBottom: 3}}>• {e}</div>)}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Documents */}
      <div style={styles.drow}>
        <div style={styles.dlabel}>📋 आवश्यक कागदपत्रे</div>
        <div style={{...styles.dval, background: "#111", borderRadius: 10, padding: "8px 10px", marginTop: 5}}>
          {s.documents.map((d, i) => <div key={i} style={{marginBottom: 4, fontSize: 12.5}}>{d}</div>)}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Where to apply */}
      <div style={styles.drow}>
        <div style={styles.dlabel}>📍 अर्ज कुठे करायचा</div>
        <div style={styles.dval}>{s.apply_at}</div>
      </div>

      {/* Helpline */}
      <div style={styles.drow}>
        <div style={styles.dlabel}>📞 हेल्पलाइन</div>
        <div style={{...styles.dval, color: "#25D366", fontWeight: 600}}>{s.helpline}</div>
      </div>

      {/* Important Note */}
      {s.note && (
        <div style={{background: "#1a1a0a", border: "1px solid #333300", borderRadius: 10, padding: "8px 10px", marginTop: 6, fontSize: 12, color: "#e8d44d", lineHeight: 1.5}}>
          {s.note}
        </div>
      )}

      <div style={{ fontSize: 11, color: "#444", marginTop: 10 }}>"परत" टाइप करा - मागे जा</div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const addBot = (content, delay = 0) => {
    return new Promise((res) =>
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", content, id: Date.now() + Math.random() }]);
        res();
      }, delay)
    );
  };

  const addUser = (text) => {
    setMessages((prev) => [...prev, { type: "user", text, id: Date.now() + Math.random() }]);
  };

  useEffect(() => {
    const init = async () => {
      await addBot("welcome", 500);
      await addBot("list", 1100);
    };
    init();
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUser(text);
    const n = parseInt(text);
    if (!isNaN(n) && n >= 1 && n <= schemes.length) {
      addBot({ type: "detail", id: n }, 400);
    } else if (/परत|back|0/i.test(text)) {
      addBot("list", 350);
    } else {
      addBot({ type: "hint" }, 350);
    }
  };

  const handleSelect = (id) => {
    addUser(`${id}`);
    addBot({ type: "detail", id }, 350);
  };

  const renderBotContent = (content) => {
    if (content === "welcome") return (
      <span>
        नमस्कार!<br />
        महाराष्ट्र शासन - योजना सहाय्यक<br />
        <span style={{ color: "#555", fontSize: 12 }}>SMS Fallback सेवा</span>
      </span>
    );
    if (content === "list") return <SchemeList onSelect={handleSelect} />;
    if (content?.type === "detail") return <SchemeDetail id={content.id} />;
    if (content?.type === "hint") return <span>नंबर 1-{schemes.length} टाइप करा. उदा: <strong>3</strong><br />मागे: <strong>परत</strong></span>;
    return null;
  };

  return (
    <div style={styles.root}>
      <div style={styles.statusBar}>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>12:47</span>
        <span style={{ color: "#fff", fontSize: 12 }}>Voi LTE 29%</span>
      </div>
      <div style={styles.header}>
        <span style={styles.back}>&#8249;</span>
        <div style={{ flex: 1 }}>
          <div style={styles.hname}>Scheme Assistant</div>
          <div style={styles.hnum}>1800-120-8040</div>
        </div>
        <div style={styles.avatar}>S</div>
      </div>
      <div ref={chatRef} style={styles.chat}>
        <div style={styles.datestamp}>10 Mar, 1:34 pm</div>
        {messages.map((msg) =>
          msg.type === "bot" ? (
            <div key={msg.id} style={styles.rowBot}>
              <div style={styles.bubbleBot}>{renderBotContent(msg.content)}</div>
              <span style={styles.badge}>1</span>
            </div>
          ) : (
            <div key={msg.id} style={styles.rowUser}>
              <span style={styles.badge}>1</span>
              <div style={styles.bubbleUser}>{msg.text}</div>
            </div>
          )
        )}
      </div>
      <div style={styles.inputBar}>
        <span style={{ color: "#777", fontSize: 24, cursor: "pointer" }}>+</span>
        <div style={styles.inputWrap}>
          <input
            style={styles.input}
            type="text"
            placeholder="Send message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
        </div>
        <button onClick={handleSend} style={styles.sendBtn}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" style={{ marginLeft: 2 }}>
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const styles = {
  root: { width:"100vw", height:"100vh", background:"#000", display:"flex", flexDirection:"column", fontFamily:"sans-serif", overflow:"hidden" },
  statusBar: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 22px 4px", flexShrink:0 },
  header: { display:"flex", alignItems:"center", padding:"6px 16px 14px", gap:12, flexShrink:0 },
  back: { color:"#fff", fontSize:28, fontWeight:300, cursor:"pointer", paddingRight:6 },
  hname: { color:"#fff", fontSize:18, fontWeight:400 },
  hnum: { color:"#888", fontSize:13, marginTop:2 },
  avatar: { width:44, height:44, borderRadius:"50%", background:"#1e7e34", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:19, fontWeight:600 },
  chat: { flex:1, background:"#000", overflowY:"auto", padding:"6px 14px 14px", display:"flex", flexDirection:"column", gap:4 },
  datestamp: { color:"#555", fontSize:12.5, textAlign:"center", margin:"8px 0 6px" },
  rowBot: { display:"flex", alignItems:"flex-end", justifyContent:"flex-start", marginBottom:2 },
  rowUser: { display:"flex", alignItems:"flex-end", justifyContent:"flex-end", marginBottom:2 },
  bubbleBot: { maxWidth:"82%", padding:"10px 14px", fontSize:15, lineHeight:1.55, color:"#fff", background:"#1c1c1e", borderRadius:"22px 22px 22px 5px", wordBreak:"break-word" },
  bubbleUser: { maxWidth:"82%", padding:"10px 14px", fontSize:15, lineHeight:1.55, color:"#fff", background:"#1b5e35", borderRadius:"22px 22px 5px 22px", wordBreak:"break-word" },
  badge: { color:"#444", fontSize:11, margin:"0 5px 3px", flexShrink:0, alignSelf:"flex-end" },
  inputBar: { display:"flex", alignItems:"center", gap:10, padding:"10px 14px 24px", background:"#000", flexShrink:0, borderTop:"1px solid #1a1a1a" },
  inputWrap: { flex:1, background:"#1c1c1e", borderRadius:26, padding:"10px 18px" },
  input: { width:"100%", border:"none", outline:"none", background:"transparent", color:"#fff", fontSize:15, fontFamily:"inherit" },
  sendBtn: { width:44, height:44, background:"#2e7d32", borderRadius:"50%", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 },
  sitem: { background:"#252525", border:"1px solid #2e2e2e", borderRadius:16, padding:"10px 13px", cursor:"pointer" },
  scat: { display:"inline-block", marginTop:5, fontSize:10.5, background:"#1b5e35", color:"#aaffaa", padding:"2px 9px", borderRadius:10 },
  dcard: { background:"#181818", border:"1px solid #282828", borderRadius:16, padding:"13px 14px", marginTop:4 },
  dtitle: { fontSize:14, fontWeight:700, color:"#25D366", marginBottom:10, lineHeight:1.4 },
  drow: { marginBottom:9 },
  dlabel: { fontSize:10, fontWeight:700, color:"#555", textTransform:"uppercase", letterSpacing:0.8 },
  dval: { fontSize:13, color:"#ccc", marginTop:3, lineHeight:1.5 },
  divider: { height:1, background:"#2a2a2a", margin:"6px 0" },
};
