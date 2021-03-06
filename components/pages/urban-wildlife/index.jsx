var React = require('react'),
    request = require('superagent'),
    util = require('util');
var Router = require('react-router');

var Navigation = Router.Navigation;
var Link = Router.Link;

var Footer = require('../../common/footer.jsx');

var UrbanThing = React.createClass({
  render : function(){
    var self = this;
    return (
      <div className="habitat_container main_wrapper">
        <div className="quiet_wild image_container">
          <img src={self.props.image} />
          { self.props.credit ? <p className="photo_credit">Photo by {self.props.credit}</p> : null }
        </div>
        <div className="quiet_wild copy_container">
          <h2>{self.props.title}</h2>
          <p>{self.props.description}</p>
        </div>
      </div>
    )
  }
});

module.exports = React.createClass({
  mixins: [ Router.State, Navigation ],

  render: function() {
    var self = this;

    return (
      <div>
        <div className="nature_notes_header egg_wrap">
          <Link to="/natural-resources" className="back_to_nr">
            <svg className="arrow_circle blue left_arrow left" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" >
              <path className="circle" strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M1,26c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25S39.8,1,26,1C12.2,1,1,12.2,1,26z"/>
              <g className="arrow" >
                <path strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' d="M22.6,25.9c0,0,1,1.6,1,4.4c0,2.6,0.6,3.5,0.6,3.8c0,0.4-0.3,0.7-0.7,0.5s-8.6-6.2-10.5-8.1
                  c0,0-0.2-0.2-0.2-0.5v-0.1c0-0.2,0.1-0.4,0.2-0.5c1.7-1.7,10.1-7.9,10.5-8.1c0.3-0.2,0.7-0.1,0.7,0.5c0,0.3-0.6,1.1-0.6,3.8
                  C23.6,24.3,22.6,25.9,22.6,25.9z" />
                <line strokeWidth="2" strokeLinecap='round' strokeMiterlimit='10' x1="24.2" y1="25.9" x2="39.3" y2="25.9"/>
              </g>
            </svg>
          </Link>
          <div className="raptor">
              <h1 className="marker">Urban Wildlife</h1>
              <p>Contact Nebraska Wildlife Rehabilitation for injured wildlife at <a href="tel:4022342473">(402) 234-2473</a>, or the humane society at <a href="tel:4024447800">(402) 444-7800</a> and they will get the injured animal to the appropriate organization.</p>
              <img src="/img/conservation/divider_bottom_grey.png" />
            </div>
        </div>
        <div className="egg_wrap">
          <div className="main_wrapper">
            <UrbanThing
              image="/img/urban-wildlife/deer.jpg"
              title="Deer – Leave fawns alone."
              key="deer"
              description='Disturbing and removing new born deer (mid-May through late-June) is a common problem. We at Fontenelle Forest annually field calls on apparent "abandoned fawns," and even receive fawns at our front desk. Female deer instinctively leave their young to hide motionless while they carry out their daily routine. This natural process reduces the risk of fawns being spotted or smelled by predators. By removing a young deer, one is only doing harm to nature`s process, leaving the mother to call and look for her young unsuccessfully.' />

            <UrbanThing
              image="/img/urban-wildlife/cat.jpg"
              title="Domestic Cats – Keep them at home."
              key="cats"
              description="When a person let's a cat outside every night, or allows for cats to become feral (wild), they are allowing for an apex predator to kill small mammals and birds at will . . .albeit, unknowingly. A well fed, friendly house cat will kill just to kill given the opportunity due to their natural instinct. They will often return each morning w/ their 'prize' in tow to be left at their master's door step. Annual bird mortality due to domestic cats is now estimated to be 1.4 to 3.7 billion and mammal mortality 6.9 – 20.7 billion individuals world-wide." />

            <UrbanThing
              image="/img/urban-wildlife/bird.jpg"
              title="Birds – They learn to fly from the ground up."
              key="bird"
              description="It is a myth that if you touch a baby bird it will be abandoned. However, as with all wildlife, it’s best to just leave it alone to do what it does. Many bird species will actually spend several days on the ground before learning to fly, in the care of their parents. If you find a baby bird on the ground with no feathers and its eyes are closed, it’s fine to place it back in the nest. " />

            <UrbanThing
              image="/img/urban-wildlife/bat.jpg"
              title="Bats – Put up a bat house before they find their way in."
              key="bat"
              description="Bats can squeeze into very small openings, so prevention is the best option. However, if bats DO get in, stay calm. Help the bat get back outside where it wants to be by closing the door to the room and opening windows. If the bat is not flying, or the room does not have direct access to outside, capture the bat using a box or small container. Be sure to wear thick work gloves, as a frightened bat will try to bite. After capturing a bat, open the container on its side, in the air or against a tree to allow the bat to fly away." />

            <UrbanThing
              image="/img/urban-wildlife/rabbit.jpg"
              title="Rabbits – Leave those bunnies at home!"
              key="rabbit"
              description="Baby bunnies are only fed at dawn and dusk, so the mother rabbit is rarely seen. If you see a small bunny with open eyes and fully furred, it’s already left the nest – they leave home early and are fully capable of taking care of themselves by 3-5 weeks old." />

            <UrbanThing
              image="/img/urban-wildlife/raccoons.jpg"
              title="Raccoons and Squirrels – The lost will be found."
              key="raccoons"
              description="Raccoons and squirrels frequently move their young around and sometimes drop them when spooked. In addition, adolescent raccoons and squirrels are prone to wandering and sometimes get lost. Usually the mother will backtrack and retrieve her young when she thinks it is safe. It is best to not interfere. Leave the young outside overnight as this is when the mother is most likely to return. Often she will approach and leave several times before retrieving the young. This is her way of testing to make sure that the coast is clear." />

          </div>
        </div>
        <Footer />
      </div>
    )
  }
});
