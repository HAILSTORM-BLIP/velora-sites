export default function StorySection({ id, label, title, copy, image, imageAlt }) {
  return (
    <section className="story section-panel" id={id}>
      <div className="story-inner">
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      {image && (
        <figure className="story-image">
          <img src={image} alt={imageAlt} loading="lazy" />
        </figure>
      )}
    </section>
  )
}
