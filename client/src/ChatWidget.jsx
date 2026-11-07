import { useEffect, useRef, useState } from 'react'
import { API_BASE } from './api.js'
import './chat-widget.css'

const initialMessage = {
  role: 'assistant',
  text: 'Hi! I’m RetroFit’s shopping assistant. Ask me about products, delivery, payment, or selling on RetroFit.',
}

function answerQuestion(question, products) {
  const text = question.toLowerCase().replace(/[৳,!?।]/g, ' ').replace(/\s+/g, ' ').trim()
  if (/^(hi|hello|hey|salaam|assalamu alaikum|সালাম|হ্যালো|হাই)$/.test(text)) return 'Hello! Ask me about RetroFit products, orders, delivery, payment, or selling.'
  if (/^(thanks|thank you|ধন্যবাদ)$/.test(text)) return 'You’re welcome! Is there anything else about RetroFit I can help with?'
  const product = products.find((item) => text.includes((item.name || '').toLowerCase()))
  if (product) {
    return `${product.name}: ৳ ${product.price}${product.size ? ` · Size ${product.size}` : ''}${product.condition ? ` · Condition: ${product.condition}` : ''}${product.material ? ` · ${product.material}` : ''}. You can find it in the ${product.group || ''} collection.`
  }

  if (/delivery|shipping|ডেলিভারি|ঢাকা/.test(text)) {
    return 'Inside Dhaka, delivery is free on orders over ৳1,500. Below that, delivery is ৳100. The checkout form lets you enter your delivery address and city.'
  }
  if (/vat|ভ্যাট|tax/.test(text)) return 'Checkout adds 5% VAT to the product subtotal.'
  if (/payment|pay|bkash|বিকাশ|cash|ক্যাশ|পেমেন্ট/.test(text)) {
    return 'You can pay by cash on delivery or bKash. For bKash, checkout shows the configured merchant number, order reference, and exact amount. Never share your PIN or verification code.'
  }
  if (/sell|seller|বিক্রি|বিক্রেতা/.test(text)) {
    return 'To sell, create an account and request seller access. An admin must approve it; then you can use the Seller dashboard to list items. Listings are reviewed before appearing in the public catalog.'
  }
  if (/return|refund|exchange|রিটার্ন|ফেরত/.test(text)) {
    return 'I can’t confirm a return or refund policy from the information available on the site. Please contact retrofit@gmail.com or call +880 1700-000000 for help.'
  }
  if (/contact|support|help|যোগাযোগ|সাহায্য|phone|email/.test(text)) {
    return 'Contact RetroFit at retrofit@gmail.com or +880 1700-000000. Customer service is listed as available every day, 10:00 AM–8:00 PM.'
  }
  if (/order|অর্ডার|track|tracking/.test(text)) {
    return 'After placing an order, RetroFit will contact you to confirm delivery. You can find your order reference on the order confirmation page.'
  }
  if (/buy|purchase|checkout|কিনতে|কেনা|কিভাবে কিনব/.test(text)) {
    return 'Choose a product, open its details, and select Add to cart. Then continue to checkout, enter your delivery details, and choose cash on delivery or bKash.'
  }
  if (/category|categories|what do you sell|কি কি পাওয়া যায়|কোন ধরনের/.test(text)) {
    return 'RetroFit lists pre-loved clothing for women, men, and kids. Browse the collections to see the currently available categories and items.'
  }
  if (/size|sizing|সাইজ/.test(text)) {
    return 'Each product listing shows its available size. Open a product card to see its size and condition details. For a specific item, ask using its product name.'
  }
  if (/what|who|about|retrofit|কী|কি|কেমন/.test(text)) {
    return 'RetroFit is a Bangladesh-focused marketplace for pre-loved clothing. You can shop women’s, men’s, and kids’ styles, or apply to sell quality clothes you no longer wear.'
  }
  if (/how are you|how r u|কেমন আছ|কেমন আছেন|কি খবর|কী খবর/.test(text)) return 'I’m doing well, thanks for asking! What would you like to know about RetroFit?'
  return 'I don’t have a verified answer for that yet. Please contact retrofit@gmail.com or +880 1700-000000 and the RetroFit team can help.'
}

export default function ChatWidget({ products = [] }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([initialMessage])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => launcherRef.current?.focus())
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const ask = async (rawQuestion) => {
    const question = rawQuestion.trim()
    if (!question || sending) return
    const nextMessages = [...messages, { role: 'user', text: question }]
    setMessages(nextMessages)
    setDraft('')
    setSending(true)
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-12).map(({ role, text }) => ({ role, content: text })) }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Chat is temporarily unavailable.')
      setMessages((current) => [...current, { role: 'assistant', text: data.answer }])
    } catch {
      const fallback = answerQuestion(question, products)
      setMessages((current) => [...current, { role: 'assistant', text: fallback }])
    } finally {
      setSending(false)
    }
  }

  const submit = (event) => {
    event.preventDefault()
    ask(draft)
  }

  return <div className="retrofit-chat">
    {open && <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <header className="chat-header"><span className="chat-avatar" aria-hidden="true"><span>R</span></span><div className="chat-heading"><strong id="chat-title">Text with us</strong><small><i /> RetroFit shopping help</small></div><button className="chat-close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button></header>
      <div className="chat-messages" ref={listRef} aria-live="polite" aria-relevant="additions text">{messages.map((message, index) => <div className={`chat-message-row ${message.role}`} key={`${index}-${message.role}`}>{message.role === 'assistant' && <span className="chat-mini-avatar" aria-hidden="true">R</span>}<p className={`chat-message ${message.role}`}>{message.text}</p></div>)}{sending && <div className="chat-message-row assistant"><span className="chat-mini-avatar" aria-hidden="true">R</span><div className="chat-typing" role="status" aria-label="RetroFit is typing"><i /><i /><i /></div></div>}
        {messages.length === 1 && <div className="chat-suggestions" aria-label="Suggested questions"><span>Try asking</span><div><button type="button" onClick={() => ask('How much is delivery?')}>Delivery</button><button type="button" onClick={() => ask('What payment methods do you accept?')}>Payment</button><button type="button" onClick={() => ask('How can I sell on RetroFit?')}>Selling</button></div></div>}
      </div>
      <form className="chat-compose" onSubmit={submit}><input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask us anything…" aria-label="Your message" maxLength={500} disabled={sending} /><button className="chat-send" type="submit" disabled={!draft.trim() || sending} aria-label="Send message"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 20 4l-5 16-3.2-6.8L4 12Z" /><path d="m11.8 13.2 4-4" /></svg></button></form>
    </section>}
    <button ref={launcherRef} className={`chat-launcher ${open ? 'is-open' : ''}`} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close chat' : 'Text with us'}>
      {open ? <span className="chat-launcher-close" aria-hidden="true">×</span> : <><span className="chat-launcher-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5.5h16v11H9l-5 3v-14Z" /><path d="M8 10h8M8 13h5" /></svg></span><span className="chat-launcher-copy"><strong>Text with us</strong><small>We’re here to help</small></span><span className="chat-launcher-arrow" aria-hidden="true">↗</span></>}
    </button>
  </div>
}
