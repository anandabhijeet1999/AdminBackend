export default function distributeContacts(contacts, agents) {
  const result = {};
  const agentIds = agents.map(a => a._id.toString());
  agentIds.forEach(id => result[id] = []);
  let i = 0;
  for (const contact of contacts) {
    const agentId = agentIds[i % agentIds.length];
    result[agentId].push(contact);
    i++;
  }
  return result;
}
