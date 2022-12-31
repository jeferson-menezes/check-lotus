import { Particle } from "../view/Particle.js";

export class FiresHelper {

    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static calculateDistance(p1x, p1y, p2x, p2y) {
        var xDistance = p1x - p2x,
            yDistance = p1y - p2y;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    static createParticles(x, y) {
        var particleCount = 30;
        while (particleCount--) {
            particles.push(new Particle(x, y));
        }
    }
}