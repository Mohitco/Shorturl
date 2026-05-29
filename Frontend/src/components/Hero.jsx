import {
  Link2,
  ShieldCheck,
  BarChart3,
  Copy,
  MousePointer,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
const Hero = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) return;

    try {
      const response = await axios.post("http://localhost:3000/api/shorten", {
        longUrl,
      });

      const data = await response.data;

      setShortUrl(data.shortUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className=" px-4 sm:px-8 md:px-12 lg:px-24 py-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
            Shorten URLs. <br />
            Share <span className="text-blue-600">More.</span>
          </h1>

          <p className="mt-5 text-slate-500 text-base sm:text-lg leading-7 max-w-xl mx-auto lg:mx-0">
            ShortURL is a fast, reliable and easy way to shorten long links and
            track their performance.
          </p>

          {/* Input Box */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-2 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-3 flex-1 px-4">
              <Link2 className="text-blue-600" size={18} />

              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Paste your long URL here"
                className="w-full outline-none py-3 text-sm sm:text-base"
              />
            </div>

            <button
              onClick={handleShorten}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-medium transition"
            >
              {loading ? "Loading..." : "Shorten URL"}
            </button>
          </div>
          {/* Show after short URL generated */}
{shortUrl && (
  <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-md max-w-xl mx-auto lg:mx-0">

    <p className="text-slate-500 text-sm mb-2 font-bold">
      Short URL
    </p>

    <div className="flex items-center justify-between gap-3">

      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-semibold truncate"
      >
        {shortUrl}
      </a>

      <div className="relative">

        {copied && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-lg shadow whitespace-nowrap">
            Copied!
          </div>
        )}

        <button
          onClick={() => {
            navigator.clipboard.writeText(shortUrl);

            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
          className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition"
        >
          <Copy size={18} />
        </button>

      </div>

    </div>

  </div>
)}

          {/* Bottom Text */}
          <div className="flex justify-center lg:justify-start items-center gap-2 mt-5 text-slate-500 text-sm sm:text-base">
            <ShieldCheck size={18} className="text-blue-600" />
            <span>Secure. Simple. Powerful.</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative w-full max-w-125 mx-auto order-1 lg:order-2">
          {/* Background */}
          <div className="absolute inset-0 bg-blue-50 rounded-[30px] sm:rounded-[40px] scale-105"></div>

          {/* Main Card */}
          <div className="relative bg-white border border-slate-200 rounded-3xl sm:rounded-[28px] shadow-xl overflow-hidden">
            {/* Browser Header */}
            <div className="h-10 sm:h-12 bg-slate-50 border-b flex items-center px-4 sm:px-5 gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
            </div>

            <div className="p-4 sm:p-6">
              {/* URL Box */}
              <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm">
                <p className="text-blue-600 font-semibold text-sm sm:text-lg md:text-xl truncate">
                  shorturl.com/abc123
                </p>

                <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Copy size={18} className="text-blue-600" />
                </button>
              </div>

              {/* Analytics */}
              <div className="mt-4 sm:mt-5 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                <p className="text-slate-400 text-xs sm:text-sm mb-2">
                  Total Clicks
                </p>

                <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">
                  12,540
                </h2>

                <p className="text-green-500 font-semibold mt-2 text-sm sm:text-base">
                  ↑ 18.6%
                </p>

                <p className="text-slate-400 text-xs sm:text-sm mb-4">
                  vs last 7 days
                </p>

                {/* Graph */}
                <div className="flex items-end gap-1 sm:gap-2 h-16 sm:h-20">
                  <div className="w-3 sm:w-4 h-6 bg-blue-200 rounded"></div>
                  <div className="w-3 sm:w-4 h-8 bg-blue-300 rounded"></div>
                  <div className="w-3 sm:w-4 h-10 bg-blue-400 rounded"></div>
                  <div className="w-3 sm:w-4 h-12 bg-blue-500 rounded"></div>
                  <div className="w-3 sm:w-4 h-14 bg-blue-600 rounded"></div>
                  <div className="w-3 sm:w-4 h-20 bg-blue-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute -top-4 sm:-top-6 right-3 sm:right-6 bg-purple-500 text-white p-3 sm:p-4 rounded-2xl shadow-lg">
            <Link2 size={20} />
          </div>

          <div className="absolute bottom-6 sm:bottom-8 -left-3 sm:-left-6 bg-yellow-400 text-white p-3 sm:p-4 rounded-2xl shadow-lg">
            <MousePointer size={18} />
          </div>

          <div className="absolute bottom-10 sm:bottom-12 -right-3 sm:-right-6 bg-green-400 text-white p-3 sm:p-4 rounded-2xl shadow-lg">
            <BarChart3 size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
