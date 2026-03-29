import { useState, useEffect, useRef } from "react";

const schemes = [
  {id:1,name:"मुख्यमंत्री माझी लाडकी बहीण योजना",benefits:"दरमहा Rs.1,500 थेट बँक खात्यात\nवयोमर्यादा: 21-65 वर्षे\nउत्पन्न मर्यादा: Rs.2.5 लाख/वर्ष",documents:"आधार कार्ड, रेशन कार्ड, बँक पासबुक",apply_at:"ग्रामपंचायत / नगरपालिका कार्यालय",link:"https://ladakibahin.maharashtra.gov.in",cat:"महिला"},
  {id:2,name:"PM किसान सन्मान निधी",benefits:"वार्षिक Rs.6,000 (Rs.2,000 x 3 हप्ते)\n2 हेक्टरपर्यंत शेतकऱ्यांसाठी",documents:"आधार, जमीन कागदपत्रे, बँक पासबुक",apply_at:"कृषी विभाग / CSC केंद्र",link:"https://pmkisan.gov.in",cat:"शेतकरी"},
  {id:3,name:"संजय गांधी निराधार अनुदान",benefits:"दरमहा Rs.600 अनुदान\nविधवा, अनाथ, अपंग व्यक्तींसाठी",documents:"आधार, रहिवास प्रमाणपत्र, उत्पन्न दाखला",apply_at:"जिल्हा समाजकल्याण कार्यालय",link:"https://aaplesarkar.mahaonline.gov.in",cat:"निराधार"},
  {id:4,name:"शिष्यवृत्ती योजना (OBC/SC/ST)",benefits:"वार्षिक Rs.10,000-Rs.50,000\nइयत्ता 1 ते पदव्युत्तर शिक्षणासाठी",documents:"जाती प्रमाणपत्र, गुणपत्रिका, उत्पन्न दाखला",apply_at:"mahaeschol.in पोर्टल",link:"https://mahaeschol.maharashtra.gov.in",cat:"शिक्षण"},
  {id:5,name:"अटल पेन्शन योजना",benefits:"Rs.1,000-Rs.5,000 मासिक पेन्शन\nवय 18-40 वर्षे",documents:"आधार, बँक खाते, मोबाइल नंबर",apply_at:"कोणत्याही राष्ट्रीयीकृत बँकेत",link:"https://npscra.nsdl.co.in",cat:"पेन्शन"},
  {id:6,name:"आयुष्मान भारत - PM-JAY",benefits:"वार्षिक Rs.5 लाखांपर्यंत मोफत उपचार\nसरकारी व खाजगी रुग्णालयांत",documents:"आधार कार्ड, रेशन कार्ड",apply_at:"जवळच्या सरकारी रुग्णालयात / CSC",link:"https://pmjay.gov.in",cat:"आरोग्य"},
  {id:7,name:"महात्मा फुले जनआरोग्य योजना",benefits:"Rs.1.5 लाखांपर्यंत मोफत शस्त्रक्रिया\n996 आजारांवर उपचार",documents:"पिवळे/केशरी रेशन कार्ड, आधार",apply_at:"नेटवर्क रुग्णालय / जिल्हा रुग्णालय",link:"https://jeevandayee.gov.in",cat:"आरोग्य"},
  {id:8,name:"मनरेगा (MGNREGA)",benefits:"वर्षातून 100 दिवस रोजगार हमी\nRs.273/दिवस मजुरी",documents:"जॉब कार्ड (ग्रामपंचायतमधून मिळते)",apply_at:"ग्रामपंचायत",link:"https://nrega.nic.in",cat:"रोजगार"},
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
      <div style={styles.drow}>
        <div style={styles.dlabel}>फायदे</div>
        <div style={styles.dval}>{s.benefits.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</div>
      </div>
      <div style={styles.drow}>
        <div style={styles.dlabel}>कागदपत्रे</div>
        <div style={styles.dval}>{s.documents}</div>
      </div>
      <div style={styles.drow}>
        <div style={styles.dlabel}>अर्ज कुठे</div>
        <div style={styles.dval}>{s.apply_at}</div>
      </div>
      <a href={s.link} target="_blank" rel="noreferrer" style={styles.alink}>Online अर्ज करा</a>
      <div style={{ fontSize: 11, color: "#444", marginTop: 8 }}>"परत" टाइप करा - मागे जा</div>
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
  alink: { display:"inline-block", marginTop:10, background:"#25D366", color:"#000", fontSize:12.5, fontWeight:700, padding:"7px 18px", borderRadius:20, textDecoration:"none" },
};
