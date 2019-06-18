
200.times do
  name = Faker::Creature::Cat.name
  breed = Faker::Creature::Cat.breed
  registry = Faker::Creature::Cat.registry
  avatar = Faker::Avatar.image(name, '100x400', 'png', 'set4')
  Cat.create(name: name, breed: breed, registry: registry, avatar: avatar)
  # Cat.create(name, breed, registry, avatar)
end

puts "200 Cats Seeded"