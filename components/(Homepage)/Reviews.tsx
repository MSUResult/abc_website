import { REVIEWS_DATA } from "@/data/reviews";

export default function ReviewsSection() {
  // We double the data so the scroll is seamless
  const infiniteReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-2">
            Our Top Rankers Speak
          </h2>
          <p className="text-slate-600">Join the elite league of JEE & NEET aspirants</p>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          {infiniteReviews.map((review, index) => (
            <div 
              key={index} 
              className="w-[350px] bg-white p-8 rounded-2xl shadow-md border border-red-50 hover:border-red-500 transition-all group/card"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-100 group-hover/card:scale-110 transition-transform"
                />
                <div>
                  <h4 className="font-bold text-red-900 leading-tight whitespace-normal">
                    {review.name}
                  </h4>
                  <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                    {review.course} • Age {review.age}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex text-yellow-500 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed italic whitespace-normal text-sm">
                "{review.text}"
              </p>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-300 uppercase italic">Verified Review</span>
                <div className="bg-red-600 text-white px-3 py-1 rounded text-[10px] font-bold">
                  ABC INSTITUTE
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}