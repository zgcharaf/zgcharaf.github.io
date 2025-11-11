---
layout: post
title: "A Compact Derivation of the Euler–Lagrange Equation"
description: Revisiting the calculus of variations with a LaTeX-inspired presentation.
categories: research
---

The calculus of variations keeps appearing in applied work—from structural economics to optimal
control—so it is worth keeping a concise derivation within reach. This note records the derivation in a
way that mirrors my handwritten notebooks and uses a small splash of color to keep the structure clear.

## Set-up

Consider a functional

$$
\mathcal{J}[y] = \int_a^b L\big(x, y(x), y'(x)\big)\,\mathrm{d}x
$$

with a smooth Lagrangian $L : \mathbb{R}^3 \to \mathbb{R}$ and admissible curves $y$ satisfying
$y(a) = \alpha$ and $y(b) = \beta$. We perturb $y$ via $y_\varepsilon = y + \varepsilon \eta$, where
$\eta(a) = \eta(b) = 0$. Stationarity demands that the first variation vanishes:

$$
\left.\frac{\mathrm{d}}{\mathrm{d}\varepsilon} \mathcal{J}[y_\varepsilon]\right|_{\varepsilon = 0} = 0.
$$

## Differentiating under the integral sign

A direct differentiation yields

$$
\frac{\mathrm{d}}{\mathrm{d}\varepsilon} \mathcal{J}[y_\varepsilon]
  = \int_a^b \left( \frac{\partial L}{\partial y} \, \eta
    + \frac{\partial L}{\partial y'} \, \eta' \right) \mathrm{d}x.
$$

The second term invites integration by parts. Integrating the $\eta'$ contribution once gives

$$
\int_a^b \frac{\partial L}{\partial y'} \, \eta' \, \mathrm{d}x
  = \left[ \frac{\partial L}{\partial y'} \, \eta \right]_a^b
  - \int_a^b \frac{\mathrm{d}}{\mathrm{d}x}\left(\frac{\partial L}{\partial y'}\right) \eta \, \mathrm{d}x.
$$

Because the perturbation $\eta$ has compact support within $(a, b)$, the boundary term vanishes. What
remains is a single integral weighted by $\eta$.

## The Euler–Lagrange equation

Collecting terms, the first variation becomes

$$
\delta \mathcal{J}[y; \eta]
  = \int_a^b \left( \frac{\partial L}{\partial y}
    - \frac{\mathrm{d}}{\mathrm{d}x} \frac{\partial L}{\partial y'} \right) \eta(x) \, \mathrm{d}x.
$$

Since $\eta$ is arbitrary apart from its boundary behavior, the fundamental lemma of the calculus of
variations yields the Euler–Lagrange equation

$$
\frac{\partial L}{\partial y} - \frac{\mathrm{d}}{\mathrm{d}x}\frac{\partial L}{\partial y'} = 0.
$$

This compact expression is the backbone of countless mechanical and economic models. Highlight it in
<span class="accent-blue">blue</span> in your notes to remind yourself where the logic converges.

## A simple example

Let $L(x, y, y') = \tfrac{1}{2} (y')^2 - V(y)$ for a potential $V$. Then

\[
\frac{\partial L}{\partial y} = -V'(y), \qquad
\frac{\partial L}{\partial y'} = y', \qquad
\frac{\mathrm{d}}{\mathrm{d}x} \frac{\partial L}{\partial y'} = y''.
\]

The Euler–Lagrange condition becomes

$$
 y'' + V'(y) = 0,
$$

a familiar second-order differential equation. Solutions trace the orbits of conservative dynamics. For a
quadratic potential $V(y) = \tfrac{1}{2} \omega^2 y^2$, the motion satisfies $y'' + \omega^2 y = 0$, an
oscillation worth marking in <span class="accent-red">red</span> ink.

## Closing note

Keep a mental checklist when deriving these results:

1. Specify the admissible perturbations (compact support keeps the boundary quiet).
2. Differentiate the functional carefully and reduce higher derivatives with integration by parts.
3. Invoke the fundamental lemma to translate a variational statement into an equation.

With those steps, the Euler–Lagrange equation becomes a trustworthy tool in day-to-day research work.
