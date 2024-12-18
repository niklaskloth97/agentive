import Image from 'next/image'

export default function Impress() {
  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Legal Notice</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Impress</h2>
            <p>
              University of Muenster<br />
              Prof. Dr. Jan vom Brocke <br/>
              Department for Information Systems<br />
              Leonardo Campus<br />
              48149 Münster<br />
              Telephone: (02 51) 83 - 389100<br />
              Fax: (02 51) 83 - 38109<br />
              <a href="mailto:info@wi.uni-muenster.de">info@wi.uni-muenster.de</a><br />
              <a href="https://www.wi.uni-muenster.de/">https://www.wi.uni-muenster.de</a><br />
            </p>
          </div>
          <div className='py-4'>
          <h2 className="text-2xl font-semibold mb-4"> </h2>
            <p className='mb-1'><strong>Edited in accordance with § 55 Abs. 2 RStV:​</strong></p>
            <p>University of Muenster<br />
              Department for Information Systems<br />
              Leonardo Campus<br />
              48149 Münster<br />
              Telephone: (02 51) 83 - 389100<br />
              Fax: (02 51) 83 - 38109<br />
              <a className="Mail" href="mailto:info@wi.uni-muenster.de">info@wi.uni-muenster.de</a><br />
              <a className="Link" href="https://www.wi.uni-muenster.de/">https://www.wi.uni-muenster.de</a>
              </p>
          </div>
        </div>
        <div className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <a className='text-slate-800'>For content feedback, wishes, issues, etc., feel free to contact:
          <br />
          Agentive Team E-Mail 
          </a>
          <a href="mailto:agentive@wi.uni-muenster.de">agentive@wi.uni-muenster.de</a><br />
          <a className='text-slate-800'>For any Webiste-related feedback, issues etc., feel free to contact:
          <br />
          Niklas Kloth: 
          </a>
          <a href="mailto:niklas.kloth@uni-muenster.de">niklas.kloth@uni-muenster.de</a><br />
        </div>
          
      </div>
  )
}