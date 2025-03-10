import { Card } from "@/components/ui/card"
import AboutCarousel from "@/components/about-carousel"

export default function AboutPage() {
  return (
    <div className="container flex flex-col gap-8 py-6 md:gap-12 md:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 md:px-0">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Healthcare Professional & Lego Builder
        </h1>
      </div>

      {/* Carousel */}
      <Card className="mx-4 overflow-hidden rounded-lg border bg-background md:mx-0">
        <AboutCarousel />
      </Card>

      {/* About Text */}
      <div className="prose prose-gray max-w-none px-4 md:px-0">
        <p className="text-base text-muted-foreground sm:text-lg">
          With over a decade of experience in healthcare and a lifelong passion for Lego building, I've developed a
          unique approach to problem-solving that combines medical expertise with creative thinking. My journey began in
          athletic training, where I learned the importance of attention to detail and patient-centered care. These same
          principles guide my approach to Lego building, where each piece must be precisely placed to create something
          extraordinary.
        </p>

        <p className="text-base text-muted-foreground sm:text-lg">
          In my professional life, I specialize in rehabilitation and injury prevention, working with athletes and
          active individuals to help them achieve their peak performance. I believe in evidence-based practice and
          continuous learning, regularly attending conferences and workshops to stay current with the latest
          developments in healthcare. This commitment to learning parallels my evolution as a Lego builder, where I
          constantly explore new techniques and challenges.
        </p>

        <p className="text-base text-muted-foreground sm:text-lg">
          My work in both healthcare and Lego building has taught me valuable lessons about patience, persistence, and
          the importance of having a clear vision while remaining flexible enough to adapt when needed. I find that the
          problem-solving skills required in healthcare often complement the creative challenges of Lego building, and
          vice versa. Whether I'm developing a rehabilitation protocol or designing a new Lego creation, my goal is
          always to achieve the best possible outcome through careful planning and precise execution.
        </p>
      </div>
    </div>
  )
}

