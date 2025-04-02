import Image from "next/image";

export default function Hero() {
  return (
    <main className="flex flex-col md:flex-row mx-auto px-4 gap-8 mb-8">
      <div className="w-full md:w-1/2">
        <Image
          className="rounded-xl w-full h-auto"
          src="/kids-football.jpg"
          alt="Children playing football"
          width={500}
          height={300}
        />
      </div>
      <section className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-extrabold mb-4">
          Footie Friends: Connecting Young Football Enthusiasts
        </h2>
        <p>
          Footie Friends connects families with fun, safe football sessions for
          kids. Find local groups, meet other parents, and build lasting
          friendships on and off the pitch. Let us bring the community together,
          one kick at a time!
        </p>
      </section>
    </main>
  );
}
