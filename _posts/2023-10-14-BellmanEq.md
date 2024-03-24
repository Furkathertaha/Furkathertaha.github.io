---
layout: post
title:  "Notes and Derivations for DRL Algorithm"
date: 2023-10-14 00:00:00 +/-0000
categories: [My Notes]
tags: [ML, Math]
---

# 1 Policy Evaluation
## 1.1 Monte-Carlo Estimation
Recall that \\
$$R_t(h)=R(s,a)|_t+\gamma\cdot R(s,a)|_{t+1}+\dots+{\gamma}^{H-t-1}\cdot R(s,a)|_{H-1}+{\gamma}^{H-t}R(s,a)|_H$$ \\
$$~~~~~~~~~~=\sum_{\tau=t}^{H} {\gamma}^{\tau-t} R(s,a)|_{\tau}$$ \\
then\\
$$
\begin{aligned}
&~~~~\sum_{\tau=t}^{H} {\gamma}^{\tau-t} \delta_{\tau} + v^{\pi}(s_t) \\
&= \sum_{\tau=t}^{H} {\gamma}^{\tau-t} (R(s,a)|_{\tau} + \gamma v^{\pi}(s_{\tau +1}) -v^{\pi}(s_{\tau}))  + v^{\pi}(s_t) \\
&=\sum_{\tau=t}^{H} {\gamma}^{\tau-t} R(s,a)|_{\tau} + \sum_{\tau=t}^{H}\gamma^{\tau -t+1} v^{\pi}(s_{\tau +1})  - \sum_{\tau=t}^{H} {\gamma}^{\tau -t} v^{\pi}(s_{\tau}) + v^{\pi}(s_t) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(1)\\
&= R_t(h) + \sum_{\tau'=t+1}^{H+1}\gamma^{\tau' -t} v^{\pi}(s_{\tau' })  - \sum_{\tau=t}^{H} {\gamma}^{\tau -t} v^{\pi}(s_{\tau}) + v^{\pi}(s_t) \\
&=R_t(h) + \gamma^{H+1 -t} v^{\pi}(s_{H+1}) - v^{\pi}(s_t)+ v^{\pi}(s_t) \\
&=R_t(h),
\end{aligned}
$$

as $$v^{\pi}(s_{H+1})$$ remains $$0$$ for reaching the end of the states and is never updated, so $$R_t(h) - v^{\pi}(s_t) = \sum_{\tau=t}^{H} {\gamma}^{\tau-t} \delta_{\tau} $$.

## 1.2 $$n$$-Step Returns
Because that \\
$$R_{t,n}(h)=\sum_{i=0}^{n-1} {\gamma}^{i} R(s,a)|_{t+i} + \gamma^{n} v^{\pi}(s_{t+n})$$ \\
then\\
$$
\begin{aligned}
&~~~~\sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i} + v^{\pi}(s_t) \\
&= \sum_{i=0}^{n-1} {\gamma}^{i} (R(s,a)|_{t+i} + \gamma v^{\pi}(s_{t+i+1}) -v^{\pi}(s_{t + i}))  + v^{\pi}(s_t) \\
&=\sum_{i=0}^{n-1} {\gamma}^{i} R(s,a)|_{t+i} + \sum_{i=0}^{n-1}\gamma^{i+1} v^{\pi}(s_{t+i +1})  - \sum_{i=0}^{n-1} {\gamma}^{i} v^{\pi}(s_{t+i}) + v^{\pi}(s_t) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(2)\\
&= R_{t,n}(h) - \gamma^{n} v^{\pi}(s_{t+n}) + \sum_{i'=1}^{n}\gamma^{i'} v^{\pi}(s_{t+i'})  - \sum_{i=0}^{n-1} {\gamma}^{i} v^{\pi}(s_{t+i}) + v^{\pi}(s_t) \\
&=R_{t,n}(h)  - \gamma^{n} v^{\pi}(s_{t+n})  + \gamma^{n} v^{\pi}(s_{t+n})- v^{\pi}(s_t)+ v^{\pi}(s_t) \\
&=R_{t,n}(h),
\end{aligned}
$$

so $$ R_{t,n}(h) - v^{\pi}(s_t) = \sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i} $$, where $$\delta$$ follows the same expression as that in (1): \\
$$ \delta_{t+i} = R(s,a)|_{t+i} + \gamma v^{\pi}(s_{t+i+1}) -v^{\pi}(s_{t + i}) $$

## 1.3 Truncated $$\lambda$$-Returns
Given that\\
$$R_{t,n}^{\lambda}(h)=(1-\lambda)\sum_{i=1}^{n-1}\lambda^{i-1}R_{t,i}(h)+\lambda^{n-1}R_{t,n}$$, where $$R_{t,n}$$ is the same as (2).\\
So \\
$$
\begin{aligned}
    R_{t,n}^{\lambda}(h)=&(1-\lambda)\sum_{i=1}^{n-1}\lambda^{i-1}
    (\sum_{k=0}^{i-1} {\gamma}^{k} R(s,a)|_{t+k} + \gamma^{i} v^{\pi}(s_{t+i}) )
    +\lambda^{n-1}R_{t,n} \\
    =&(1-\lambda)\sum_{i=1}^{n-1}
    \sum_{k=0}^{i-1} \lambda^{i-1} {\gamma}^{k} R(s,a)|_{t+k}  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(3)\\
    +&(1-\lambda)\sum_{i=1}^{n-1}\lambda^{i-1}\gamma^{i} v^{\pi}(s_{t+i})
    +\lambda^{n-1}R_{t,n} 
\end{aligned}
\label{eq}
$$

Then we can start writing similar manipulation for $$\delta_{t+k}$$ to equivalent the $$R(s,a)$$ contained in Eq.3, as: \\
$$
\begin{aligned}
    \sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}\delta_{t+k}=&\sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}(R(s,a)|_{t+k} + \gamma v^{\pi}(s_{t+k+1}) -v^{\pi}(s_{t + k})) \\
    =&\sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}R(s,a)|_{t+k}  \\
    +&\sum_{i=1}^{n-1}\lambda^{i-1}(  \sum_{k=0}^{i-1}\gamma^{k+1} v^{\pi}(s_{t+k+1})  - \sum_{k=0}^{i-1} {\gamma}^{k} v^{\pi}(s_{t+k}) ) \\
    =&\sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}R(s,a)|_{t+k}  
    +\sum_{i=1}^{n-1}\lambda^{i-1} (\gamma^i v^{\pi}(s_{t+i})-v^{\pi}(s_t)) ~~~~~~~~~~~~~~~~~~~~~~~(4)\\
    =&\frac{R_{t,n}^{\lambda}(h) - \lambda^{n-1}R_{t,n}}{1-\lambda} - \sum_{i=1}^{n-1}\lambda^{i-1} v^{\pi}(s_t) \\
    =&\frac{R_{t,n}^{\lambda}(h)}{1-\lambda} - \frac{\lambda^{n-1}}{1-\lambda} (\sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i}+v^{\pi}(s_t)) - \frac{1-\lambda^{n-1}}{1-\lambda} v^{\pi}(s_t) \\
    =&\frac{R_{t,n}^{\lambda}(h)-v^{\pi}(s_t)}{1-\lambda}- \frac{\lambda^{n-1}}{1-\lambda} \sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i}.
\end{aligned}
$$\\
This gives that,\\
$$
    \begin{aligned}
        R_{t,n}^{\lambda}(h)-v^{\pi}(s_t)=&(1-\lambda)(\sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}\delta_{t+k})+\lambda^{n-1}\sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i} \\
        =&\sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}\delta_{t+k} - \sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i}\gamma^{k}\delta_{t+k} +\lambda^{n-1}\sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i} \\
        =&\sum_{i=1}^{n-1}\sum_{k=0}^{i-1}\lambda^{i-1}\gamma^{k}\delta_{t+k} - \sum_{i'=2}^{n}\sum_{k=0}^{i'-2}\lambda^{i'-1}\gamma^{k}\delta_{t+k} +\lambda^{n-1}\sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i} \\
        =&\delta_t +\sum_{i=2}^{n-1}\lambda^{i-1}\gamma^{i-1}\delta_{t+i-1}- \sum_{k=0}^{n-2}\lambda^{n-1}\lambda^{k}\delta_{t+k}+\lambda^{n-1}\sum_{i=0}^{n-1} {\gamma}^{i} \delta_{t+i} ~~~~~~~~~~~~~~~~~~~~~~~~(5)\\
        =&\delta_t +\sum_{i=2}^{n-1}\lambda^{i-1}\gamma^{i-1}\delta_{t+i-1}+\lambda^{n-1}{\gamma}^{n-1} \delta_{t+n-1} \\
        =&\sum_{i=1}^{n}\lambda^{i-1}\gamma^{i-1}\delta_{t+i-1} \\
        =&\sum_{i=0}^{n-1}\lambda^{i}\gamma^{i}\delta_{t+i}
    \end{aligned}
$$

# 2 Policy Learning
## 2.1 SARSA

<img src="assets/images/Notes/algo_sarsa.jpg" alt="algo1" width="600" />

## 2.2 Convergence Issue of Linear Q-Learning
### 2.2.1 $$Q^\pi$$-Function

The relation of $$Q^{\pi}$$ and $$v^{\pi}$$ is that 

$$~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Q^{\pi}(s,a)=r(s,a) + \gamma \sum_{s'}P(s'|s,a)v^{\pi}(s').~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~$$ 

For a linear quadratic regulator (LQR) problem, the reward $$R$$ is defined quadratically from the state $$s$$ and action $$a$$.
Once the action is chosen for a state, the transition to the next state and gained reward is certain, and by the quadratic form of $$v^{\pi}$$, the relation is further expressed as 

$$
    ~~~~~~~~~~~~~~Q^{\pi}(s,a)= -s^2 -a^2 +\gamma \cdot K_{\pi} (s+a)^2 = 
    \left[ \begin{array}{cc} s& a \end{array} \right] 
    \left[\begin{array}{cc}
    \gamma K_{\pi}-1 &\gamma K_{\pi}\\
    \gamma K_{\pi}&\gamma K_{\pi} -1\\
    \end{array}\right]
     \left[\begin{array}{c}
    s\\
     a \\
    \end{array}\right],~~~~~~~~~~~(6)
$$

and this matrix is denoted as $$H_{\pi}$$.

### 2.2.2 Optimal Bellman Equation with $$Q$$*-Function
Recall the relation $$v^{\pi}(s)$$, $$v^*(s)$$, $$Q^{\pi}(s,a)$$, and $$Q^*(s,a)$$:

$$
\begin{aligned}
V(s)&=E_a[Q(s, a)]  \\
&~ \\
V^\pi(s) &= E_{a \sim \pi(a \mid s)}E_{s\prime \sim p(s\prime \mid s, a)}[ r(s, a, s\prime) + \gamma V^\pi(s\prime)] \\
&~ \\
V^\pi(s) &= E_{a \sim \pi(a \mid s)}[Q^\pi(s, a)] \\
&~ \\
Q^\pi(s, a) &= E_{s\prime \sim p(s\prime \mid s, a)} [r(s, a, s\prime) + \gamma E_{a\prime \sim \pi(a\prime \mid s\prime)}[Q^\pi(s\prime, a\prime)]] \\
&~ \\ 
V^*(s) &= \max\limits_a E_{s^\prime \sim p(s^\prime \mid s, a)}[r(s, a, s^\prime) + \gamma V^*(s^\prime)] \\
&~ \\
Q^*(s, a) &= E_{s^\prime \sim p(s^\prime \mid s, a)}[r(s, a, s^\prime) + \gamma \max\limits_{a\prime} Q^*(s^\prime, a^\prime)], \\
&~ \\
and~~~v^*(s)&=Q^*(s,\pi_*(s))=\max\limits_{a}Q(s,a). 
\end{aligned}
$$

The relation of $$Q^{*}(s,\pi_*(s))$$ and $$Q^{*}(s',\pi_*(s'))$$ is then:
 
$$
\begin{aligned}
        Q^{*}(s,\pi_*(s))=&r(s,\pi_*(s)) + \gamma Q^{*}(s',\pi_*(s')) \\
        \Rightarrow \\
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~K_{*} (s)^2=& -s^2 -a^2 +\gamma \cdot K_{*} (s+a)^2,~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(7) \\
=&[s~ a] 
    \left[\begin{array}{cc}
    \gamma K_{*}-1 &\gamma K_{*}\\
    \gamma K_{*}&\gamma K_{*} -1\\
    \end{array}\right]
     \left[\begin{array}{c}
    s\\
     a \\
    \end{array}\right],
\end{aligned}
\label{eq:q}
$$

because the policy is deterministic and fully transfers to the next state as $$s'=s+a_{\pi_*}(s)$$, and provided that $$v^{*}(s) $$ is a specific choice of $$v^{\pi}(s)$$ which follows $$v^{*}(s)= K_* s^2 $$, where $$v^*(s)$$ also equals $$Q^*(s,\pi_*(s))$$ and that matrix is denoted as $$H_{\pi *}$$ .

### 2.2.3 $$Q$$*-Function

To optimize a policy, for each state $$s$$, the chosen action $$a=\pi(s)$$ should diminish the gradient of $$Q$$ value regarded with $$a$$, as from above quadratic formulation of $$Q^*$$ as Eq.7 we know the problem must be convex. This means 

$$
\begin{aligned}
    \forall s, \frac{dQ^*(s,a)}{da} =& -2a + \gamma \cdot 2 K_* (s+a) =0,\\
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~a=& \frac{\gamma K_*}{1-\gamma K_*} s = \lambda s,~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~(8)\\
    so ~\lambda = & \frac{\gamma K_*}{1-\gamma K_*} .
\end{aligned}
\label{eq:gamma}
$$

From Eq.7  we can also have the relation:

$$
\begin{aligned}
    Q^*(s)-\gamma Q^*(s') = -s^2 -\pi(s)^2  
   &= v^*(s) - \gamma v*(s') \\
    = -s^2 -(\lambda s)^2 &=  K_* s^2 - \gamma K_*( s+\lambda s)^2  \\
    \Rightarrow ~~~-1- \lambda^2&=  K_* - \gamma K_*(1+ \lambda )^2 ,\\
\end{aligned}
$$

and by the relation of Eq.8: 

$$
\begin{aligned}
 -1- (\frac{\gamma K_*}{1-\gamma K_*})^2=  K_* - &\gamma K_*(1+ \frac{\gamma K_*}{1-\gamma K_*})^2 \\
  \Rightarrow ~~~  \gamma ^2 K_*^3 +(2 \gamma^2 -2 \gamma) K_*^2 &+ (1-3 \gamma) K_* +1 =0 \\
\end{aligned}
$$

For this cubic algebraic equation, only the minus sign solution $$K^{*}_{^-}$$ is allowed because from the reward $$-s^2-a^2$$ we know the value function has to be a negative value.\\
Therefore,

$$
H_{\pi*}=
    \left[\begin{array}{cc}
    \gamma  K_*-1 &\gamma  K_*\\
    \gamma  K_*&\gamma  K_* -1\\
    \end{array}\right]
$$

Some conclusion are, from $$K_*$$ and the relation of Eq.8 one can obtain that
the best linear policy would give $$a(s) = \lambda s$$. From the reward $$-s^2 -a^2$$ one know that a good policy must try to transfer the state closing $$s=0$$, meanwhile also maintain the largest reward gained through this process. And this should also be related to $$\gamma$$, 
for the situation of this question it gives such a $$\lambda$$ and $$K_{*}$$. From the result one can find $$K_* = \lambda_* -1$$. If not writing $$\gamma$$ as a precise quantity but remain the letter symbol in above equations, from the analytic solution, one can find this relation always holds regardless the choice of $$\gamma$$ for such a linear quadratic regulator question.




