import React from 'react'
import { Zap, Twitter, Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Services:  ['AI Automation','SEO Intelligence','Lead Generation','CRM Automation','AI Chatbots','Social Media AI'],
  Company:   ['About','Case Studies','Blog','Careers','Press'],
  Resources: ['Free SEO Audit','AI Growth Guide','Automation Templates','n8n Workflows'],
  Legal:     ['Privacy Policy','Terms of Service','Cookie Policy'],
}

const socials = [
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/swaraj-shukla-automatewithraj' },
  { icon: Twitter,   label: 'Twitter',   href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook,  label: 'Facebook',  href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t" style={{ borderColor:'rgba(255,255,255,0.06)', background:'#040b16' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background:'linear-gradient(135deg,#0ea5e9,#a855f7)' }}>
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="grad-text">AutomateWith</span>
                <span className="text-white">Raj</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-1 font-body">by Swaraj Shukla</p>
            <p className="font-body text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              AI Growth Infrastructure for modern businesses. Performance Marketer & Automation Specialist — New Delhi, India.
            </p>
            <div className="space-y-2">
              {[
                { icon: Mail,    text:'swaraj.shukla07@gmail.com' },
                { icon: Phone,   text:'+91 40489739'              },
                { icon: MapPin,  text:'New Delhi, India'          },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon size={13} className="text-slate-600" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor:'rgba(255,255,255,0.05)' }}>
          <p className="font-body text-xs text-slate-600">
            © {new Date().getFullYear()} AutomatewithRaj — Swaraj Shukla. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(14,165,233,0.12)'; e.currentTarget.style.borderColor='rgba(14,165,233,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)' }}>
                <Icon size={14} className="text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
