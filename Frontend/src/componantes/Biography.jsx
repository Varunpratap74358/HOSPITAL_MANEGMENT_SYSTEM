import React from 'react'

const Biography = ({imgurl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imgurl} alt="about img" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who Are You</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolore nemo minima ab nostrum exercitationem corrupti, soluta facere, distinctio accusamus deleniti, fugit atque numquam veniam enim. Dolores impedit earum quasi ipsa cupiditate dolorem! Maxime quae aliquid dolore? Non modi exercitationem corporis. Suscipit, ex sit fugiat minima at doloribus odio! Tenetur.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, nostrum?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus eos dolor sit tenetur dolorum sequi sint molestiae aliquam voluptatem incidunt facere dolorem, necessitatibus nihil, doloribus facilis, similique saepe itaque quis iure perferendis? Rerum fuga ducimus ea tempore doloribus cum voluptatem.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque architecto et labore possimus repellat nesciunt.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas illo ullam necessitatibus.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  )
}

export default Biography
