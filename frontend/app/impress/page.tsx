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
        </div>
      </div>
  )
}